import { IPost } from "./post.model";
import { IUser } from "./user.model";

export interface ITopic {
    ID: number
    Title: string
    CreationDate: Date | number
    Creator: IUser
    isPrivate: boolean

    posts?: IPost[]
}