import {answerMessage, TDefaultAnswer} from '@iisdc/types';


export const generateAnswer = (params?:Partial<TDefaultAnswer>):TDefaultAnswer => {
	const defaultAnswer:TDefaultAnswer = {
		message: params?.message ?? answerMessage.unknownError,
	}
	return {...defaultAnswer,...params}
}