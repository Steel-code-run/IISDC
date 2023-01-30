export type IUser ={
    name: string;
    password: string;

}

export type IUserOperation = {
    id: number;
}  & IUser