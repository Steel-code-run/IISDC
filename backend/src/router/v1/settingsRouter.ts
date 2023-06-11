import {Router} from "express";
import prisma from "../../prisma/connect";

const settingsRouter = Router();

const baseUrl = '/v1/settings'


// возвращает настройки
settingsRouter.post(baseUrl, async (req, res) => {

    const settings = await prisma.appSettings.findFirst({})

    // если настроек нет, то создаем их
    if (!settings){
        prisma.appSettings.create({
            data:{
                parsersWorkTimeStart: "00:00",
                parsersWorkTimeEnd: "00:00",
            }
        })
    }

    return res.json(settings)
})

// обновляет настройки
settingsRouter.post(baseUrl+"/update", async (req, res) => {

    let settings = await prisma.appSettings.findFirst({})

    // если настроек нет, то создаем их
    if (!settings){
        settings = await prisma.appSettings.create({
            data:{
                parsersWorkTimeStart: "00:00",
                parsersWorkTimeEnd: "00:00",
            }
        })
    }

    try {
        settings = await prisma.appSettings.update({
            where: {
                id: settings.id
            },
            data: {
                parsersWorkTimeStart: req.body.parsersWorkTimeStart,
                parsersWorkTimeEnd: req.body.parsersWorkTimeEnd,
            }
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({errors: [{msg: 'Ошибка при обновлении настроек'}]});
    }

    return res.json(settings)

})

export default settingsRouter;