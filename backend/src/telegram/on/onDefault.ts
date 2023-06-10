import TelegramBot from "node-telegram-bot-api";

const default_reply_markup = {
    inline_keyboard: [
        [
            {
                text: 'К настройкам',
                callback_data: 'settings'
            }
        ]
    ]
}

export const onDefault = (bot: TelegramBot) => {
    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(
            chatId,
            'Привет, я немного тебя не понял, возьми новую клавиатуру',
            {
                reply_markup: default_reply_markup
            }
        );
    });
};