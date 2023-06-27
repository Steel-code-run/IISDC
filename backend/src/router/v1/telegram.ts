import {Router} from "express";
import prisma from "../../prisma/connect";
import {check, validationResult} from "express-validator";
import md5 from "md5";
import {bot} from "../../telegram/init";
import {directions} from "../../directions";

const telegramRouter = Router();

const baseUrl = '/v1/telegram'

// Вход в телеграмм
telegramRouter.get(baseUrl+"/login", async (req, res) => {

    return res.render('telegram', {id:124})
})

telegramRouter.post(baseUrl+"/login", async (req, res) => {


    await check('name').isString().run(req)
    await check('password').isString().run(req)
    await check('telegram_id').isString().run(req)

    const telegram_id = req.query.telegram_id
    const password = req.body.password
    const name = req.body.name

    const errors = validationResult(req);

    if (typeof name !== 'string') {
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
            name: name,
            password: md5(password)
        }
    })

    if (!user){
        return res.render('telegram',{errors: [{msg: 'Не получилось войти'}]})
    }
    let telegram_setting

    if (user.user_telegram_settingsId) {
        telegram_setting = await prisma.users_telegram_settings.findFirst({
            where: {
                id: user.user_telegram_settingsId
            }
        })
    }
    if (!telegram_setting){
        let workTimeStart = new Date()
        workTimeStart.setHours(9)
        workTimeStart.setMinutes(0)

        let workTimeEnd = new Date()
        workTimeEnd.setHours(20)
        workTimeEnd.setMinutes(0)

        telegram_setting = await prisma.users_telegram_settings.create({
            data: {
                workTimeStart: workTimeStart,
                workTimeEnd: workTimeEnd
            }
        })
    }
    if (!telegram_setting)
        return res.render('telegram',{errors: [{msg: 'Не получилось войти'}]})


    await prisma.users.update({
        where:{
            id:user.id
        },
        data:{
            users_telegramsId:telegram_id,
            User_telegram_settings:{
                connect:{
                    id:telegram_setting.id
                }
            }
        }
    })

    if (bot){
        await bot.sendMessage(telegram_id, `Успешная привязка аккаунта ${user.email} к телеграмму, 
        напишите любое сообщение, чтобы начать`)
    }

    return res.render('telegram/success')
})

export default telegramRouter