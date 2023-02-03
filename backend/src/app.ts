import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import path from 'path';
import {__projectPath} from "./utils/projectPath";
import router from "./router/defaultRouter";
import {frequentlyInitTelegramBot} from "./telegram/telegram";
console.log(path.join(__projectPath,'../',`.env.${process.env.NODE_ENV}`))
dotenv.config({path:path.join(__projectPath,'../',`.env.${process.env.NODE_ENV}`)});
const app = express();
const port = process.env.PORT || 3003;
const corsOptions = {
	credentials: true, //access-control-allow-credentials:true
};
app.use(router);
app.use(cors(corsOptions));
app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
frequentlyInitTelegramBot()

