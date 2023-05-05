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

dotenv.config();
const app = express();
const port = process.env.PORT || 3003;

// Пока связи с бд нет, приложение не запускается
connect().then(async _ => {
	console.log("connected to db")

	const corsOptions = {
		credentials: true, //access-control-allow-credentials:true,
		exposedHeaders: 'Authorization',
		origin:async function (origin:any, callback:any) {
			let whitelist:any = [];
			try {
				whitelist = await prisma.whitelist.findMany().then((res) => {
					return res.map((item) => {
						return item.origin
					})
				});
			} catch (e) {
				console.log(e)
				callback(new Error('Not allowed by CORS'))
			}
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
	// routes end
})

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

