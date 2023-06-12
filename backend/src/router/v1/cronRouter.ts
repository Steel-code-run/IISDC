import {Router} from "express";
import {jobsList} from "../../cron/parsing";
const cronRouter = Router();

cronRouter.get('/test', async (req, res) => {
    return res.json({message: jobsList[0].Job.running})
})

export default cronRouter;