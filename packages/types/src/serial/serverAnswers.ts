export type TDefaultAnswer = {
	message: answerMessage | string;
	data?: { [key: string]: any } | null;
};

export enum answerMessage  {
	"success"= "success",
	"unknownError"= "unknown error",
	"unauthorized"= "unauthorized",
	"userNotFound"= "User not found",
	"wrongPasswordOrEmail"= "Wrong password or email",
	"userAlreadyExists"= "User already exists",
}


