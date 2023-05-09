import {Router} from "express";
import {infinityParsingLoop} from "../../model/parsers/parsesActivation";
import {check, validationResult} from "express-validator";
import prisma from "../../prisma/connect";

const infinityParsingLoopRouter = Router();

const baseUrl = '/v1/parsing-loop'

infinityParsingLoopRouter.get(baseUrl, async (req, res) => {
    let currentParsing = infinityParsingLoop.currentParsing;
    let currentParsingExtended:any = null;
    if (currentParsing) {
        currentParsingExtended = {
            ...currentParsing,
            parser: await prisma.parsers.findUnique({
                where: {
                    id: currentParsing.parser_id
                }
            })
        }
    }

    return res.status(200).json({data: {
        started: infinityParsingLoop.infinityLoopStarted,
        currentParsing: currentParsingExtended,
    }});

})

infinityParsingLoopRouter.get(baseUrl + '/queue', async (req, res) => {

    let queue = await prisma.parsing_queue.findMany({
        take:200,
        orderBy: {
            id: 'asc'
        }
    })

    let queueExt = [];
    for (const item of queue) {
        let parser = await prisma.parsers.findUnique({
            where: {
                id: item.parser_id
            }
        })
        queueExt.push({
            id: item.id,
            parser: parser,
            page: item.page,
        })
    }

    return res.status(200).json({data: queueExt});
})

infinityParsingLoopRouter.post(baseUrl + '/queue', async (req, res) => {

    await check('parser_ids', 'Не указаны парсеры')
        .isArray()
        .run(req);

    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        return res.status(422).json({errors: validationErrors.array()});
    }

    for (const parser_id of req.body.parser_ids) {
        await prisma.parsing_queue.create({
            data: {
                parser_id: parser_id,
                page: req.body.page || 1,
            }
        })
    }

    return res.status(200).json();
})


infinityParsingLoopRouter.delete(baseUrl + '/queue', async (req, res) => {
    await check('id', 'Не указан id')
        .isInt()
        .run(req);

    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        return res.status(422).json({errors: validationErrors.array()});
    }

    await prisma.parsing_queue.delete({
        where: {
            id: req.body.id
        }
    })

    return res.status(200).json();
})
export default infinityParsingLoopRouter;