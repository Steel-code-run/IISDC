type TDefaultAnswer = {
	status: number;
	message: string;
	data: { [key: string]: any } | null;
};

export type TGenerateAnswer = (
	params?: Partial<TDefaultAnswer>
) => TDefaultAnswer;
