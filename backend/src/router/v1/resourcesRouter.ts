import {CustomRequest} from "../../types/Express";
import express, {Router, Express, Response} from "express";
import prisma from "../../prisma/connect";
import {check} from "express-validator";

let resourcesRouter = Router();
resourcesRouter.post('/v1/resources/get', async (req , res) => {
    try {
        let resources_access = await prisma.resources_access.findMany({
            where: req.body.where,
            skip: req.body.skip,
            take: req.body.take,
        })
        let resources_access_count = await prisma.resources_access.count({
            where: req.body.where,
        })
        res.json({
            resources_access_count: resources_access_count,
            resources_access: resources_access,
        })
    } catch (e) {
        res.status(500).json({errors: [{msg: 'Ошибка при получении ресурсов'}]});
    }
});

resourcesRouter.post('/v1/resources/addRoleAccess', async (req , res) => {

    await check('path', 'Путь не может быть пустым')
        .notEmpty()
        .run(req);
    await check('role_id', 'Роль не может быть пустой')
        .notEmpty()
        .isNumeric()
        .run(req);

    const data = {} as any
    data["path"]= req.body.path;

    try {
        data["role"] = await prisma.users_role.findUnique({
            where: {
                id: req.body.role_id
            }
        })

        if (!data.role) {
            return res.status(422).json({errors: [{msg: 'Роль не найдена'}]});
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({errors: [{msg: 'Ошибка добавления роли'}]});
    }

    try{
        data["role_access"] = await prisma.resources_access.findFirst({
            where: {
                role: {
                    id: data.role.id
                },
                path: data.path
            }
        })

        if (data.role_access) {
            return res.status(422).json({errors: [{msg: 'Доступ уже существует'}]});
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({errors: [{msg: 'Ошибка добавления роли'}]});
    }

    try {
        await prisma.resources_access.create({
            data: {
                path: data.path,
                role: {
                    connect: {
                        id: data.role.id
                    }
                }
            }
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({errors: [{msg: 'Ошибка добавления роли'}]});
    }

    res.json({msg: 'Роль добавлена'})
});

resourcesRouter.post('/v1/resources/removeRoleAccess', async (req , res) => {

});
export default resourcesRouter;