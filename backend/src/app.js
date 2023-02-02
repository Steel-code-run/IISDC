"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const defaultRouter_1 = __importDefault(require("~/src/router/defaultRouter"));
const projectPath_1 = require("~/src/utils/projectPath");
const telegram_1 = require("~/src/telegram/telegram");
const path_1 = __importDefault(require("path"));
console.log(path_1.default.join(projectPath_1.__projectPath, '../', `.env.${process.env.NODE_ENV}`));
dotenv_1.default.config({ path: path_1.default.join(projectPath_1.__projectPath, '../', `.env.${process.env.NODE_ENV}`) });
const app = (0, express_1.default)();
const port = process.env.PORT || 3003;
const corsOptions = {
    credentials: true, //access-control-allow-credentials:true
};
app.use(defaultRouter_1.default);
app.use((0, cors_1.default)(corsOptions));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
(0, telegram_1.frequentlyInitTelegramBot)();
//# sourceMappingURL=app.js.map