"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.frequentlyInitTelegramBot = exports.sendTelegramMessage = void 0;
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const dotenv_1 = __importDefault(require("dotenv"));
const path = __importStar(require("path"));
const consoleLog_1 = require("../utils/consoleLog");
const projectPath_1 = require("../utils/projectPath");
dotenv_1.default.config({ path: path.join(projectPath_1.__projectPath, '../', `.env.${process.env.NODE_ENV}`) });
const token = process.env.TELEGRAM_BOT_TOKEN;
let bot = null;
function initTelegramBot() {
    if (token === undefined) {
        throw new Error('Telegram bot token or chat id is undefined');
    }
    return (bot = new node_telegram_bot_api_1.default(token, { polling: false }));
}
async function sendTelegramMessage({ chatId, message }) {
    if (bot === null) {
        throw new Error('Telegram bot is not initialized');
    }
    await bot.sendMessage(chatId, message).catch((e) => {
        throw new Error(e.message);
    });
    return true;
}
exports.sendTelegramMessage = sendTelegramMessage;
function frequentlyInitTelegramBot() {
    initTelegramBot();
    if (bot === null)
        throw new Error('Telegram have error in initialization');
    bot.getMe().then(() => {
        (0, consoleLog_1.consoleLog)("Telegram bot is authorized");
    }).catch(() => {
        (0, consoleLog_1.consoleLog)("Telegram bot is not authorized. Trying to reinitialize in 10 seconds");
        setTimeout(() => frequentlyInitTelegramBot(), 10000);
    });
}
exports.frequentlyInitTelegramBot = frequentlyInitTelegramBot;
//# sourceMappingURL=telegram.js.map