export type IUser ={
    id: number;
    name: string;

}

export type IUserWithPassword = {
    password: string;

} & IUser