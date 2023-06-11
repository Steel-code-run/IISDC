import {Router} from "express";

const baseRouter = Router();
baseRouter.get('/', (req, res) => {
    return res.json("200")
})

export default baseRouter;