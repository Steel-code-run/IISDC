import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import path from 'path';
import {__projectPath} from "./utils/projectPath";
import defaultRouter from "./router/defaultRouter";
import {frequentlyInitTelegramBot} from "./telegram/telegram";
import {setUser} from "./auth/middleware";
import privateRouter from "./router/privateRouter";
import {enableParsing} from "./model/parsing";
import {configureAll} from "./API/sqlite/configurateDataBase/configureDataBase";
dotenv.config({path:path.join(__projectPath,'../',`.env.${process.env.NODE_ENV}`)});
const app = express();
const port = process.env.PORT || 3003;
const corsOptions = {
	credentials: true, //access-control-allow-credentials:true
};

configureAll()

app.use(cors(corsOptions));
app.use(express.json());
app.use(setUser);
app.use(defaultRouter);
app.use(privateRouter)
app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

setTimeout(()=>{
	frequentlyInitTelegramBot()
	enableParsing()
},3000)
