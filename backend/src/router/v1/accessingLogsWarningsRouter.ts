import {Router} from "express";
import prisma from "../../prisma/connect";
import {check, validationResult} from "express-validator";

const accessingLogsWarningsRouter = Router();

const baseUrl = '/v1/accessing-logs/warnings'


accessingLogsWarningsRouter.post(baseUrl, async (req, res) => {
    try {
        let logs = await prisma.accessing_logs_warnings.findMany({
            where: req.body.where,
            orderBy: req.body.orderBy,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            },
            skip: Number(req.body.skip) | 0,
            take: Number(req.body.take) || 10,
        })
        let count = await prisma.accessing_logs_warnings.count({
            where: req.body.where
        })
        return res.json({
            count,
            logs
        })
    } catch (e) {
        res.status(500).json({errors: [{msg: 'Ошибка при получении логов'}]});

    }
})

accessingLogsWarningsRouter.post(baseUrl + '/update', async (req, res) => {
    await check('id').isInt().run(req);

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    try {
        let log = await prisma.accessing_logs_warnings.update({
            where: {
                id: Number(req.body.id)
            },
            data: req.body.data
        })
        return res.json({
            log
        })
    }
    catch (e) {
        res.status(500).json({errors: [{msg: 'Ошибка при обновлении лога'}]});
    }
})

export default accessingLogsWarningsRouter;