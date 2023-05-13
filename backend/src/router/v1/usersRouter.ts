import {check,validationResult} from "express-validator";
import prisma from "../../prisma/connect";
import md5 from "md5";
import jwt from "jsonwebtoken";
import express, {Router} from "express";
import {CustomRequest} from "../../types/Express";

const usersRouter = Router();

const base_url = '/v1/users';

usersRouter.post(base_url, async (req:express.Request, res:express.Response) => {

    await check('name', 'Имя должно быть не менее 4 символов')
        .isLength({min:4})
        .run(req);
    await check('email', 'Пожалуйста, введите действительный адрес электронной почты')
        .isEmail()
        .run(req);
    await check('password', 'Пароль должен быть не менее 6 символов')
        .isLength({min: 6})
        .run(req);

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }

    const {
        name,
        email,
        password,
        role_id
    } = req.body;

    const role = await prisma.users_role.findFirst({
        where: {
            id: role_id
        }
    })

    if (!role){
        return res.status(422).json({errors: [{msg: 'Такой роли не существует'}]});
    }

    const userExist = await prisma.users.findFirst({
        where: {
            name: name
        }
    });

    if (userExist){
        return res.status(422).json({errors: [{msg: 'Такой пользователь уже существует'}]});
    }

    try {
        await prisma.users.create({
            data: {
                name: name,
                email: email,
                password: md5(password),
                role: {
                    connect: {
                        id: role.id
                    }
                }
            }
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({errors: [{msg: 'Ошибка при добавлении пользователя'}]});
    }

    return res.status(200).json({message: 'Пользователь успешно добавлен'})
})

usersRouter.get(base_url, async (req:express.Request, res:express.Response) => {

    await check('skip', 'skip должен быть числом')
        .isNumeric()
        .run(req);
    await check('take', 'take должен быть числом')
        .isNumeric()
        .run(req);

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    let users = await prisma.users.findMany({
        skip: req.body.skip || 0,
        take: req.body.take || 10,
        select: {
            id: true,
            name: true,
            email: true,
            role: {
                select: {
                    id: true,
                    name: true
                }
            }
        },
        where: req.body.where || {}
    });

    return res.status(200).json(users);
});

usersRouter.delete(base_url, async (req:express.Request, res:express.Response) => {

    await check('id', 'id должен быть числом')
        .isNumeric()
        .run(req);

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }

    try {
        await prisma.users.delete({
            where: {
                id: req.body.id
            }
        })
    } catch (e) {
        return res.status(500).json({errors: [{msg: 'Ошибка при удалении пользователя'}]});
    }

    return res.status(200).json({message: 'Пользователь успешно удален'});
})

usersRouter.patch(base_url, async (req:express.Request, res:express.Response) => {

    await check('id', 'id должен быть числом')
        .isNumeric()
        .run(req);

    const {
        id,
        name,
        email,
        password,
        role_id
    } = req.body;

    let data:any = {};

    if (role_id !== undefined){
        const role = await prisma.users_role.findFirst({
            where: {
                id: role_id
            }
        })

        if (!role){
            return res.status(422).json({errors: [{msg: 'Такой роли не существует'}]});
        }

        data.role = {
            connect: {
                id: role.id
            }
        }
    }

    if (name !== undefined){
        await check('name', 'Имя должно быть не менее 4 символов')
            .isLength({min:4})
            .run(req);
        data.name = name;
    }

    if (email !== undefined){
        await check('email', 'Пожалуйста, введите действительный адрес электронной почты')
            .isEmail()
            .run(req);
        data.email = email;
    }

    if (password !== undefined){
        await check('password', 'Пароль должен быть не менее 6 символов')
            .isLength({min: 6})
            .run(req);
        data.password = md5(password);
    }

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }

    try {
        await prisma.users.update({
            where: {
                id: id
            },
            data: data
        })
    } catch (e) {
        return res.status(500).json({errors: [{msg: 'Ошибка при обновлении пользователя'}]});
    }

    return res.status(200).json({message: 'Пользователь успешно обновлен'});
});

usersRouter.post(base_url+'/login', async (req:CustomRequest, res:any) => {


    await check('password', 'Пароль должен быть не менее 6 символов')
        .isLength({min: 6})
        .run(req);
    await check('name', 'Имя должно быть не менее 4 символов')
        .isLength({min:4})
        .run(req);

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    let user = null;
    try {
       user = await prisma.users.findFirst({
            where: {
                name: req.body.name,
                password: md5(req.body.password)
            }
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({errors: [{msg: 'Ошибка при авторизации'}]});
    }

    if (!user){
        return res.status(422).json({errors: [{msg: 'Неверный логин или пароль'}]});
    }

    const payload = {
        name: req.body.name,
        id: user.id,
    }

    const options = {
        expiresIn: "1d"
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET!, options)

    return res.status(200).json({token: token});
});

export default usersRouter;