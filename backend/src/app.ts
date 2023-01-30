import 'module-alias/register';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from '~/src/router/defaultRouter';
import {__projectPath} from "~/src/utils/projectPath";
import {frequentlyInitTelegramBot} from "~/src/telegram/telegram";

dotenv.config({ path: __projectPath + `\\..\\.env.${process.env.NODE_ENV}` });
const app = express();
const port = process.env.PORT || 3001;

const corsOptions = {
	credentials: true, //access-control-allow-credentials:true
};
app.use(router);
app.use(cors(corsOptions));
app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
frequentlyInitTelegramBot()

