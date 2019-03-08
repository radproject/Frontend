import { IPost } from "./post.model";

export interface ITopic {
    ID: number
    Title: string
    CreationDate: Date

    CreatorId: string
    SubscribedIds: string[]
    
    isPrivate: boolean

    Posts?: IPost[]
}