import {CustomRequest} from "../../types/Express";
import express, {Router, Express, Response} from "express";
import prisma from "../../prisma/connect";
import {check, validationResult} from "express-validator";

let resourcesRouter = Router();
resourcesRouter.post('/v1/resources/get', async (req , res) => {
    try {
        let resources_access = await prisma.resources_access.findMany({
            where: req.body.where,
            skip: req.body.skip,
            take: req.body.take,
            orderBy: req.body.orderBy || {
                id: 'desc'
            },
            include:{
                role: true
            },
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

resourcesRouter.post('/v1/resources/add', async (req , res) => {

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
        return res.status(500).json({errors: [{msg: 'Ошибка добавления'}]});
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
        return res.status(500).json({errors: [{msg: 'Ошибка добавления'}]});
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
        return res.status(500).json({errors: [{msg: 'Ошибка добавления'}]});
    }

    res.json({msg: 'Добавлено'})
});

resourcesRouter.post('/v1/resources/delete', async (req , res) => {
    await check('id', 'Путь не может быть пустым')
        .notEmpty()
        .isNumeric()
        .run(req);


    try {
        await prisma.resources_access.delete({
            where: {
                id: req.body.id
            }
        })
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({errors: [{msg: 'Ошибка удаления'}]});
    }
});

resourcesRouter.post('/v1/resources/update', async (req , res) => {
    await check('id', 'Путь не может быть пустым')
        .notEmpty()
        .isNumeric()
        .run(req);

    await check('path', 'Путь не может быть пустым')
        .notEmpty()
        .run(req);

    await check('role_id', 'Роль не может быть пустой')
        .notEmpty()
        .isNumeric()
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors});
    }

    const role = await prisma.users_role.findUnique({
        where: {
            id: req.body.role_id
        },
    })

    if (!role) {
        return res.status(422).json({errors: [{msg: 'Роль не найдена'}]});
    }

    const data = {} as any
    data["path"]= req.body.path;
    data["id"]= req.body.id;

    try {
        await prisma.resources_access.update({
            where: {
                id: data.id
            },
            data: {
                path: data.path,
                role: {
                    connect: {
                        id: role.id
                    }
                }
            }
        })
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({errors: [{msg: 'Ошибка обновления'}]});
    }

    res.json({msg: 'Обновлено'})
})
export default resourcesRouter;