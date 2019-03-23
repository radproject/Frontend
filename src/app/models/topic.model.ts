import { IPost } from "./post.model";
import { IUser } from "./user.model";

export interface ITopic {
    Id: number
    Title: string
    CreationDate: Date | number
    Creator: IUser
    isPrivate: boolean

    posts?: IPost[]
}