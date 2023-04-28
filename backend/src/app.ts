import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import path from 'path';
import baseRouter from "./router/baseRouter";

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


// routes end
app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

