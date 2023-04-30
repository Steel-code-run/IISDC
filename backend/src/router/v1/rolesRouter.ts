import {Router} from "express";
import prisma from "../../prisma/connect";
import {check, validationResult} from "express-validator";
import {Prisma, PrismaClient} from "@prisma/client";

const rolesRouter = Router();

rolesRouter.post('/v1/roles/add', async (req, res) => {

    await check('name', 'Имя должно быть не менее 4 символов')
        .isLength({min:4})
        .run(req);

    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        return res.status(422).json({errors: validationErrors.array()});
    }

    const {
        name
    } = req.body;

    const roleExist = await prisma.user_role.findFirst({
        where: {
            name: name
        }
    });

    if (roleExist){
        return res.status(422).json({errors: [{msg: 'Такая роль уже существует'}]});
    }

    try {
        await prisma.user_role.create({
            data: {
                name: name
            }
        })
    } catch (e) {
        return res.status(500).json({errors: [{msg: 'Ошибка при добавлении роли'}]});
    }


    return res.status(200).json({message: 'Роль успешно добавлена'})
})

rolesRouter.post('/v1/roles/get', async (req, res) => {
    let roles: Prisma.User_roleUncheckedCreateInput[] | undefined;

    try {
        roles = await prisma.user_role.findMany();
    } catch (e) {
        return res.status(500).json({errors: [{msg: 'Ошибка при получении ролей'}]});
    }

    return res.status(200).json(roles);
})

rolesRouter.post('/v1/roles/delete', async (req, res) => {

    await check('id', 'Не указан id роли')
        .notEmpty()
        .run(req);

    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        return res.status(422).json({errors: validationErrors.array()});
    }

    try {
        await prisma.user_role.delete({
            where: {
                id: req.body.id
            }
        })
    } catch (e) {
        return res.status(500).json({errors: [{msg: 'Ошибка при удалении роли'}]});
    }

    return res.status(200).json({message: 'Роль успешно удалена'})

})
export default rolesRouter;