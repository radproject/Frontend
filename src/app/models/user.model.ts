import { ITopic } from "./topic.model";

export interface IUser {
    StudentId: string
    Name: string
    email: string
    subscribedTopics: number[]
}