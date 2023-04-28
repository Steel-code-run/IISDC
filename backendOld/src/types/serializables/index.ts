import {TCompetition, TGrant, TInternship, TVacancy} from "@iisdc/types";

export type ISendTelegramMessage = {
	message: string;
	chatId: string;
};

export type telegramUserIntervalSettings = {
	start: string,
	end: string
}

export type telegramUser = {
	id: number,
	telegramId: number,
	settings: {
		grantsSettings?: Partial<TGrant>,
		competitionsSettings?: Partial<TCompetition>,
		vacanciesSettings?: Partial<TVacancy>,
		internshipsSettings?: Partial<TInternship>,
		intervalSettings?: telegramUserIntervalSettings
	}
}