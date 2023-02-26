import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import * as path from "path";
import {ISendTelegramMessage} from "../types/serializables";
import {consoleLog} from "../utils/consoleLog";
import {__projectPath} from "../utils/projectPath";
import {onMsgScenario} from "./scenario";
dotenv.config({path:path.join(__projectPath,'../',`.env.${process.env.NODE_ENV}`)});

const token = process.env.TELEGRAM_BOT_TOKEN;

export let bot: TelegramBot | null = null;

function initTelegramBot() {
	if (token === undefined) {
		throw new Error('Telegram bot token or chat id is undefined');
	}
	return (bot = new TelegramBot(token, { polling: true }));
}

export async function sendTelegramMessage({ chatId, message }: ISendTelegramMessage) {
	if (bot === null) {
		throw new Error('Telegram bot is not initialized');
	}
	await bot.sendMessage(chatId, message).catch((e)=>{
		throw new Error(e.message)
	})

	return true
}

export function frequentlyInitTelegramBot(){
	try {
		initTelegramBot()
	} catch (e) {
		consoleLog(e)
		return
	}
	if (bot === null)
		throw new Error('Telegram have error in initialization');
	bot.getMe().then(()=>{
		consoleLog("Telegram bot is authorized")
		onMsgScenario(bot!)
	}).catch(()=>{
		consoleLog("Telegram bot is not authorized. Trying to reinitialize in 10 seconds")
		setTimeout(()=>frequentlyInitTelegramBot(),10000)
	})
}