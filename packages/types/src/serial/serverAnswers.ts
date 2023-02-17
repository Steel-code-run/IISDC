export type TDefaultAnswer = {
	message: answerMessage | string;
	data?: { [key: string]: any } | null | string;
};

export enum answerMessage  {
	"success"= "success",
	"unknownError"= "unknown error",
	"unauthorized"= "unauthorized",
	"userNotFound"= "User not found",
	"wrongPasswordOrEmailOrName"= "Wrong password or name or email",
	"userAlreadyExists"= "User already exists",
	"insufficientRole" = "Insufficient role",
}


