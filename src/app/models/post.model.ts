import { IUser } from "./user.model";

export interface IPost {
    ID: number
    Text: string
    TimeStamp: number
    // ThreadID: number
    Creator: IUser
}