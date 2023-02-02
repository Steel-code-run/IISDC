import { TGenerateAnswer } from '@iisdc/types';

export const generateSuccessfulAnswer: TGenerateAnswer = (params) => {
	return {
		status: params?.status || 200,
		message: params?.message || 'Successful',
		data: params?.data || null,
	};
};

export const generateErrorAnswer: TGenerateAnswer = (params) => {
	return {
		status: params?.status || 400,
		message: params?.message || 'Error',
		data: params?.data || null,
	};
};
