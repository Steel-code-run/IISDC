import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { ISendTelegramMessage } from '~/src/types/serializables';
import {__projectPath} from "~/src/utils/projectPath";
import {consoleLog} from "~/src/utils/consoleLog";

dotenv.config({ path: __projectPath + `\\..\\.env.${process.env.NODE_ENV}` });

const token = process.env.TELEGRAM_BOT_TOKEN;

let bot: TelegramBot | null = null;

function initTelegramBot() {
	if (token === undefined) {
		throw new Error('Telegram bot token or chat id is undefined');
	}
	return (bot = new TelegramBot(token, { polling: false }));
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
	initTelegramBot()
	if (bot === null)
		throw new Error('Telegram have error in initialization');
	bot.getMe().then(()=>{
		consoleLog("Telegram bot is authorized")
	}).catch(()=>{
		consoleLog("Telegram bot is not authorized. Trying to reinitialize in 10 seconds")
		setTimeout(()=>frequentlyInitTelegramBot(),10000)
	})
}