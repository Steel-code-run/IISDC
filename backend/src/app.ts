import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import path from 'path';
import {__projectPath} from "./utils/projectPath";
import {frequentlyInitTelegramBot} from "./telegram/telegram";
import {setUser} from "./auth/middleware";
import {configureAll} from "./API/sqlite/configurateDataBase/configureDataBase";
import {generateBYPASSToken} from "./auth/jwt";
import {consoleLog} from "./utils/consoleLog";
import {enableParserScheduler} from "./model/parser";
dotenv.config({path:path.join(__projectPath,'../',`.env.${process.env.NODE_ENV}`)});
const app = express();
const port = process.env.PORT || 3003;
const corsOptions = {
	credentials: true, //access-control-allow-credentials:true,
	exposedHeaders: 'Authorization'
};
import vacancies from "./router/routes/vacancies";
import stats from "./router/routes/stats";
import grants from "./router/routes/grants";
import auth from "./router/routes/auth";
import users from "./router/routes/users";
import parsers from "./router/routes/parsers";
import competitions from "./router/routes/competitions";
import internships from "./router/routes/internships";
import database from "./router/routes/database";

configureAll()

app.use(cors(corsOptions));
app.use(express.json());

// JWT
app.use(setUser);

// routes

app.use(stats);
app.use(grants);
app.use(auth);
app.use(users);
app.use(parsers);
app.use(competitions)
app.use(vacancies);
app.use(database);
app.use(internships);

// routes end
app.listen(port, () => {
	consoleLog(`⚡️[server]: Server is running at http://localhost:${port}`);
});

setTimeout(()=>{
	frequentlyInitTelegramBot()
	enableParserScheduler()
},3000)

if (process.env.NODE_ENV === "development") {
	const BYPASSUserIUser = {
		name: "BYPASS",
		role: 999,
		id: -100,
	}
	console.log("Bearer " + generateBYPASSToken(BYPASSUserIUser)!)
}
