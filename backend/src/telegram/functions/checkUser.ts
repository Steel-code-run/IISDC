import TelegramBot from "node-telegram-bot-api";
import prisma from "../../prisma/connect";

export const getUser = async (id:string|undefined|number) => {
    if (!id) {
        return false
    }

    const user = await prisma.users.findFirst({
        where:{
            users_telegramsId: String(id)
        }
    })

    if (!user) {
        return false
    }

    return user
}