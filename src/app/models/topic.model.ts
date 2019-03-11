import { IPost } from "./post.model";
import { IUser } from "./user.model";

export interface ITopic {
    ID: number
    Title: string
    CreationDate: Date

    CreatorId: string | Partial<IUser>
    SubscribedIds?: string[]
    
    isPrivate: boolean

    Posts?: IPost[]
}