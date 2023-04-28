import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const app = express();
const port = process.env.PORT || 3003;
console.log(process.env)
const corsOptions = {
	credentials: true, //access-control-allow-credentials:true,
	exposedHeaders: 'Authorization'
};


app.use(cors(corsOptions));
app.use(express.json());


// routes end
app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

