import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const corsOptions ={
    credentials:true, //access-control-allow-credentials:true
}
app.use(cors(corsOptions))
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});