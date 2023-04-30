import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import path from 'path';
import baseRouter from "./router/baseRouter";
import grantsRouter from "./router/v1/grantsRouter";
import {connect} from "./prisma/connect";
import usersRouter from "./router/v1/usersRouter";
import rolesRouter from "./router/v1/rolesRouter";

dotenv.config();
const app = express();
const port = process.env.PORT || 3003;

const whitelist = [
	"0.0.0.0",
	"localhost"
]

// Пока связи с бд нет, приложение не запускается
connect().then(_ => {
	console.log("connected to db")

	const corsOptions = {
		credentials: true, //access-control-allow-credentials:true,
		exposedHeaders: 'Authorization',
		origin: function (origin:any, callback:any) {
			if (whitelist.indexOf(origin) !== -1) {
				callback(null, true)
			} else {
				callback(new Error('Not allowed by CORS'))
			}
		}
	};

	// плагины
	app.use(cors(corsOptions));
	app.use(express.json());

	// routes start
	app.use(baseRouter);
	app.use(grantsRouter);
	app.use(usersRouter);
	app.use(rolesRouter);
	// routes end
})

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

