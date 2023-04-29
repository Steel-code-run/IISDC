import {Router} from 'express';
import prisma from "../../prisma/connect";

const grantsRouter = Router();

grantsRouter.get('/v1/grants', async (req, res) => {

})

export default grantsRouter;