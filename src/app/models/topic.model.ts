export interface ITopic {
    ID: number
    Title: string,
    CreationDate: Date
    
    PostId: number
    CreatorId: string
    SubscribedIds: string[]

    isPrivate: boolean
}

export interface IPost {
    ID: number
    Text: string
    TimeStamp: number
    ThreadID: number
    CreatorId: string
}