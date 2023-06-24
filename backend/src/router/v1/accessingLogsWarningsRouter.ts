import {Router} from "express";

const accessingLogsWarningsRouter = Router();

const baseUrl = '/v1/accessing-logs/warnings'

/**
 * Если пользователь заходит более чем с 5 разных ip адресов в течении 60 минут, то отправляется предупреждение о подозрительной активности
 */
accessingLogsWarningsRouter.post(baseUrl, async (req, res) => {

})