import {Router} from "express";
import prisma from "../../prisma/connect";
import {check, validationResult} from "express-validator";
import {infinityParsingLoop} from "../../model/parsers/parsesActivation";

const parsersRouter = Router();

const baseUrl = '/v1/parsers'
parsersRouter.get(baseUrl, async (req, res) => {
    let parsers = await prisma.parsers.findMany({
        take: 200,
        orderBy: {
            id: 'desc'
        }
    });

    return res.status(200).json(parsers);
})

parsersRouter.patch(baseUrl, async (req, res) => {
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

    let data = {} as any;
    if (req.body.name)
        data["name"] = req.body.name;
    if (req.body.description)
        data["description"] = req.body.description;
    if (req.body.isEnabled)
        data["isEnabled"] = req.body.isEnabled;
    if (req.body.pagesToParse)
        data["pagesToParse"] = req.body.pagesToParse;

    await prisma.parsers.update({
        where: {
            id: req.body.id
        },
        data: data
    });

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