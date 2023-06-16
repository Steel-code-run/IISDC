import TelegramBot from "node-telegram-bot-api";
import prisma from "../../prisma/connect";
import {CallbackQueryManager} from "../CallbackQueryManager";

export interface OnSomethingProps {
    bot: TelegramBot;
    chatId: number;
    user: Awaited<ReturnType<typeof prisma.users.findFirst>>;
    callbackQuery?: CallbackQueryManager;
}
