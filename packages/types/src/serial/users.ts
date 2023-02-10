export enum UserRole {
    quest = 0,
    user = 1,
    admin = 2,
}

export type IUser ={
    id: number;
    name: string;
    role:UserRole;
}

export type IUserWithPassword = {
    password: string;

} & IUser