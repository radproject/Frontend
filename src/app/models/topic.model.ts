import { IPost } from "./post.model";
import { IUser } from "./user.model";

export interface ITopic {
    Id: number
    Title: string
    CreationDate: Date | number
    creator: IUser
    isPrivate: boolean

    posts?: IPost[]
}