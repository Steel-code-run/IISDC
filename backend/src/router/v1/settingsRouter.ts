import {Router} from "express";
import prisma from "../../prisma/connect";
import {check, validationResult} from "express-validator";
import {infinityParsingLoop} from "../../model/parsers/parsesActivation";

const settingsRouter = Router();

const baseUrl = '/v1/settings'

settingsRouter.post(baseUrl+'/update', async (req, res) => {

    let currentSettings = await prisma.appSettings.findFirst()

    if (!currentSettings) {
        await prisma.appSettings.create({
            data: {
                parsersWorkTimeStart: new Date(10 * 3600 * 1000),
                parsersWorkTimeEnd: new Date(24 * 3600 * 1000),
                parsingInterval: new Date(1 * 3600 * 1000),
                parsingEnabled: false,
            }
        })
    }

    if (req.body.parsersWorkTimeStart)
        await check('parsersWorkTimeStart', "Неверный формат времени {2022-09-09T00:00:00}")
            .isISO8601()
            .run(req);
    if (req.body.parsersWorkTimeEnd)
        await check('parsersWorkTimeEnd', "Неверный формат времени {HH:mm:ss}")
            .isDate({format: 'HH:mm:ss'})
            .run(req);
    if (req.body.parsingInterval)
        await check('parsingInterval', "Неверный формат времени {HH:mm:ss}")
            .isDate({format: 'HH:mm:ss'})
            .run(req);
    if (req.body.parsingEnabled)
        await check('parsingEnabled')
            .isBoolean()

    if (!req.body.parsersWorkTimeStart &&
        !req.body.parsersWorkTimeEnd &&
        !req.body.parsingInterval &&
        !req.body.parsingEnabled) {
        return res.status(422).json({errors: [{msg: 'Нет данных для обновления'}]});
    }
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        return res.status(422).json({errors: validationErrors.array()});
    }

    let data: any = {}

    if (req.body.parsersWorkTimeStart)
        data.parsersWorkTimeStart = new Date(req.body.parsersWorkTimeStart)
    if (req.body.parsersWorkTimeEnd)
        data.parsersWorkTimeEnd = new Date(req.body.parsersWorkTimeEnd)
    if (req.body.parsingInterval)
        data.parsingInterval = new Date(req.body.parsingInterval)
    if (req.body.parsingEnabled)
        data.parsingEnabled = req.body.parsingEnabled

    await prisma.appSettings.update({
        where: {
            id: currentSettings?.id || 1
        },
         data:data
    })

    if (data.parsingEnabled)
        infinityParsingLoop.forceStart()

    res.status(200).send()
})

settingsRouter.get(baseUrl+'/get', async (req, res) => {

    let currentSettings = await prisma.appSettings.findFirst()

    if (!currentSettings) {
        currentSettings = await prisma.appSettings.create({
            data: {
                parsersWorkTimeStart: new Date(10 * 3600 * 1000),
                parsersWorkTimeEnd: new Date(24 * 3600 * 1000),
                parsingInterval: new Date(1 * 3600 * 1000),
                parsingEnabled: false,
            }
        })
    }
    res.status(200).json(currentSettings)
})
export default settingsRouter;