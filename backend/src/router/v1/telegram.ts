import {Router} from "express";
import prisma from "../../prisma/connect";
import {check, validationResult} from "express-validator";
import md5 from "md5";

const telegramRouter = Router();

const baseUrl = '/v1/telegram'

// Вход в телеграмм
telegramRouter.get(baseUrl+"/login", async (req, res) => {

    return res.render('telegram', {id:124})
})

telegramRouter.post(baseUrl+"/login", async (req, res) => {


    await check('email').isString().run(req)
    await check('password').isString().run(req)
    await check('telegram_id').isString().run(req)

    const telegram_id = req.query.telegram_id
    const email = req.body.email
    const password = req.body.password

    const errors = validationResult(req);

    if (typeof email !== 'string') {
        return res.render('telegram',{errors: [{msg: 'Ошибка с email'}]})
    }
    if (typeof password !== 'string') {
        return res.render('telegram',{errors: [{msg: 'Ошибка с паролем'}]})
    }
    if (typeof telegram_id !== 'string') {
        return res.render('telegram',{errors: [{msg: 'Ошибка с telegram_id, советует открыть ссылку снова'}]})
    }

    if (!errors.isEmpty()) {
        return res.render('telegram',{errors: errors.array()})
    }


    const user = await prisma.users.findFirst({
        where: {
            email: email,
            password: md5(password)
        }
    })

    if (!user){
        return res.render('telegram',{errors: [{msg: 'Не получилось войти'}]})
    }

    await prisma.users.update({
        where:{
            id:user.id
        },
        data:{
            users_telegramsId:telegram_id
        }
    })

    return res.render('telegram/success', {id:124})
})

export default telegramRouter