import cors from "cors";
import dotenv from 'dotenv';
import baseRouter from "./router/baseRouter";
import grantsRouter from "./router/v1/grantsRouter";
import prisma, {connect} from "./prisma/connect";
import usersRouter from "./router/v1/usersRouter";
import rolesRouter from "./router/v1/rolesRouter";
import express from "express";
import resourceAccess from "./middlewares/resourceAccess";
import getUserFromToken from "./middlewares/getUserFromToken";
import accessingLog from "./middlewares/acessingLog";
import resourcesRouter from "./router/v1/resourcesRouter";
import settingsRouter from "./router/v1/settingsRouter";
import parsersRouter from "./router/v1/parsersRouter";
import {telegramBotInit} from "./telegram/init";
import {addJob} from "./cron/parsing";

dotenv.config();
const app = express();
const port = process.env.PORT || 3003;

// Пока связи с бд нет, приложение не запускается
connect().then(async _ => {

	const corsOptions = {
		credentials: true, //access-control-allow-credentials:true,
		exposedHeaders: 'Authorization',
	};

	// плагины
	app.use(cors(corsOptions));
	app.use(express.json());

	// мидлвары
	app.use(getUserFromToken as any);
	app.use(accessingLog as any);
	app.use(resourceAccess as any);

	// routes start
	app.use(baseRouter);
	app.use(grantsRouter);
	app.use(usersRouter);
	app.use(rolesRouter);
	app.use(resourcesRouter);
	app.use(settingsRouter);
	app.use(parsersRouter);
	// routes end

	// Добавление парсеров в крон
	const parsers = await prisma.parsers.findMany();
	parsers.forEach(parser => {
		if (!parser.cronTime){
			return;
		}
		if (parser.isEnabled){
			addJob(parser.id);
		}
	})

	// init telegram
	telegramBotInit();
})

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

