import {Router} from 'express';

const baseRouter = Router();

baseRouter.get('/', (req, res) => {
    return res.json("is Alive")
})

export default baseRouter;