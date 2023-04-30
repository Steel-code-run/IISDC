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
const corsOptions = {
	credentials: true, //access-control-allow-credentials:true,
	exposedHeaders: 'Authorization'
};


app.use(cors(corsOptions));
app.use(express.json());


app.use(baseRouter);
app.use(grantsRouter);
app.use(usersRouter);
app.use(rolesRouter);


// db connect
connect().then(_ => console.log("connected to db"))


// routes end
app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

