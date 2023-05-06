import {Router} from "express";
import prisma from "../../prisma/connect";

const parserRouter = Router();

const baseUrl = '/v1/parser'
parserRouter.get(baseUrl+'/forceStart', async (req, res) => {

})