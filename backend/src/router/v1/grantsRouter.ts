import {Router} from 'express';
import prisma from "../../prisma/connect";

const grantsRouter = Router();

grantsRouter.get('/v1/grants', async (req, res) => {

    return res.json(await prisma.user.findMany({
        where:{
            id:{

            }
        }
    }))

    return res.json("is Alive")
})

export default grantsRouter;