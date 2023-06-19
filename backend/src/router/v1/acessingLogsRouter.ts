import {Router} from "express";
import prisma from "../../prisma/connect";
const accessingLogsRouter = Router();

accessingLogsRouter.post('/v1/accessing-logs', async (req, res) => {

    try {
        let logs = await prisma.acessing_logs.findMany({
            skip: req.body.skip || 0,
            take: req.body.take || 10,
            where: req.body.where || {},
            orderBy: req.body.orderBy || {}
        })
        let count = await prisma.acessing_logs.count({
            where: req.body.where || {}
        })
        return res.json({
            count,
            logs
        })
    } catch (e) {
        res.json(e)
    }

})

export default accessingLogsRouter;
