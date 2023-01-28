import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { ISendTelegramMessage } from '~/src/types/fsm';
import {__projectPath} from "~/src/utils/projectPath";

dotenv.config({ path: __projectPath + `\\..\\.env.${process.env.NODE_ENV}` });

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatID = process.env.TELEGRAM_CHANNEL_ID;

let bot: TelegramBot | null = null;

export function initTelegramBot() {
	if (token === undefined || chatID === undefined) {
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
