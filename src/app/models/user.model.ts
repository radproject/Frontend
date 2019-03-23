import { ITopic } from "./topic.model";

export interface IUser {
    Id: string
    StudentId: string
    Name: string
    email: string
    subscribedTopics?: number[];
    FullName: string
}