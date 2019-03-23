import { IUser } from "./user.model";

export interface IPost {
    Id: number
    Text: string
    TimeStamp: number
    // ThreadID: number
    Creator: IUser
}