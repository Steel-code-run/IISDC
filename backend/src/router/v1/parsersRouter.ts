import express, {Router} from "express";
import prisma from "../../prisma/connect";
import {check, validationResult} from "express-validator";
import {addJob, updateJob} from "../../cron/parsing";
import usersRouter from "./usersRouter";

const parsersRouter = Router();

const baseUrl = '/v1/parsers'
parsersRouter.post(baseUrl, async (req, res) => {


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
    try {
        let parsers = await prisma.parsers.findMany({
            skip: req.body.skip || 0,
            take: req.body.take || 10,
            orderBy: {
                id: 'desc'
            },
            where: req.body.where || {}

        });
        return res.status(200).json(parsers);
    }
    catch (e) {
        return res.status(500).json({errors: [{msg: 'Ошибка при получении парсеров'}]});
    }

})

usersRouter.post(baseUrl + "/count", async (req:express.Request, res:express.Response) => {
    try{
        const count = await prisma.parsers.count({
            where: req.body.where || {}
        });
        return res.status(200).json({count: count});
    } catch (e) {
        return res.status(500).json({errors: [{msg: 'Ошибка при получении количества парсеров'}]});
    }
});

parsersRouter.patch(baseUrl, async (req, res) => {
    await check('id', 'Не указан id парсера')
        .isInt()
        .run(req);

    if (req.body.cronTime) {
        const reg_exp = new RegExp(/^(((\*\/\d{1,2})|(\d{1,2})|(\*))\s?){1,6}$/);
        await check('cronTime', 'Неверный формат cronTime')
            .matches(reg_exp)
            .run(req);
    }


    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        return res.status(422).json({errors: validationErrors.array()});
    }

    let parser = await prisma.parsers.findUnique({
        where: {
            id: req.body.id
        }
    });

    if (!parser){
        return res.status(422).json({errors: [{msg: 'Парсер не найден'}]});
    }

    let data = {} as any;
    if (req.body.name)
        data["name"] = req.body.name;
    if (req.body.description)
        data["description"] = req.body.description;
    if (req.body.isEnabled)
        data["isEnabled"] = req.body.isEnabled;
    if (req.body.pagesToParse)
        data["pagesToParse"] = req.body.pagesToParse;
    if (req.body.cronTime)
        data["cronTime"] = req.body.cronTime;

    await prisma.parsers.update({
        where: {
            id: req.body.id
        },
        data: data
    });

    if (req.body.isEnabled) {
        addJob(parser.id).then();
    }

    if (req.body.cronTime){
        updateJob(parser.id)
    }
    return res.status(200).json({message: 'Парсер успешно обновлен'});

})

parsersRouter.delete(baseUrl, async (req, res) => {
    await check('id', 'Не указан id парсера')
        .isInt()
        .run(req);

    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        return res.status(422).json({errors: validationErrors.array()});
    }

    let parser = await prisma.parsers.findUnique({
        where: {
            id: req.body.id
        }
    });

    if (!parser){
        return res.status(422).json({errors: [{msg: 'Парсер не найден'}]});
    }

    await prisma.parsers.delete({
        where: {
            id: req.body.id
        }
    });

    return res.status(200).json({message: 'Парсер успешно удален'});
});

parsersRouter.post(baseUrl, async (req, res) => {

    await check("name", "Не указано имя парсера")
        .notEmpty()
        .run(req);

    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        return res.status(422).json({errors: validationErrors.array()});
    }

    let data = {
        name: req.body.name,
        description: req.body.description,
        isEnabled: req.body.isEnabled || true,
        pagesToParse: req.body.pagesToParse || 1
    }

    let parser = await prisma.parsers.findFirst({
        where: {
            name: req.body.name
        }
    });

    if (parser){
        return res.status(422).json({errors: [{msg: 'Парсер с таким именем уже существует'}]});
    }

    let parserNew = await prisma.parsers.create({
        data: data
    })

    return res.status(200).json({message: 'Парсер успешно добавлен', data: parserNew})
})
export default parsersRouter;