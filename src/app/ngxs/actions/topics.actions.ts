import { ITopic } from "src/app/models/topic.model";
import { IPost } from "src/app/models/post.model";

//Get all topics
export class GetAllTopics {
    static readonly type = '[Topics] Get All Topics'
}

export class GetAllTopicsSuccess {
    static readonly type = '[Topics] Get All Topics Success'
    constructor(public topics: ITopic[]) { }
}

export class GetAllTopicsFailure {
    static readonly type = '[Topics] Get All Topics Failure'
    constructor(public error: string) { }
}

//Create Topic
export class CreateTopic {
    static readonly type = '[Topics] Add Topic'
    constructor(public topic: Partial<ITopic>) { }
}

export class CreateTopicSuccess { 
    static readonly type = '[Topics] Add Topic Success'
}

export class CreateTopicFailure {
    static readonly type = '[Topics] Add Topic Failure'
    constructor(public error: string) { }
}

//Delete Topic
export class DeleteTopic {
    static readonly type = '[Topics] Delete Topic'
    constructor(public id: number) { }
}

export class DeleteTopicSuccess {
    static readonly type = '[Topics] Delete Topic Success'
}

export class DeleteTopicFailure {
    static readonly type = '[Topics] Delete Topic Failure'
    constructor(public error: string) { }
}

//Get Subscribed Topics
export class GetSubscribedTopics {
    static readonly type = '[Topics] Get Subscribed Topics'
    constructor(public userID: string) { }
}

export class GetSubscribedTopicsSuccess {
    static readonly type = '[Topics] Get Subscribed Topics Success'
    constructor(public topics: ITopic[]) { }
}

export class GetSubscribedTopicsFailure {
    static readonly type = '[Topics] Get Subscribed Topics Failure'
    constructor(public error: string) { }
}

//Get topic by ID
export class GetTopicByID {
    static readonly type = '[Topics] Get Topic By ID'
    constructor(public id: number) { }
}

export class GetTopicByIDSuccess {
    static readonly type = '[Topics] Get Topic By ID Success'
    constructor(public topic: ITopic) { }
}

export class GetTopicByIDFailure {
    static readonly type = '[Topics] Get Topic By ID Failure'
    constructor(public error: string) { }
}

//Clear selected
export class  ClearSelectedTopic {
    static readonly type = '[Topics] Clear Selected Topic'
}

//Add post to topic
export class AddPostToTopic {
    static readonly type = '[Topics] Add Post to Topic'
    constructor(public topicID: number, public post: Partial<IPost>) { }
}

export class AddPostToTopicSuccess {
    static readonly type = '[Topics] Add Post to Topic Success'
}

export class AddPostToTopicFailure {
    static readonly type = '[Topics] Add Post to Topic Failure'
    constructor(public error: string) { }
}

//Topic subbing

//Subscribe to topic
export class SubscribeToTopic {
    static readonly type = '[Topics] Subscribe to topic'
    constructor(public id: number) { }
}

export class SubscribeToTopicSuccess {
    static readonly type = '[Topics] Subscribe to topic success'
}

export class SubscribeToTopicFailure {
    static readonly type = '[Topics] Subscribe to topic failure'
    constructor(public error: string) { }
}

//Unsubscribe from topic
export class UnsubscribeFromTopic {
    static readonly type = '[Topics] Unsubscrube from topic'
    constructor(public id: number) { }
}

export class UnsubscribeFromTopicSuccess {
    static readonly type = '[Topics] Unsubscribe from topic success'
}

export class UnsubscribeFromTopicFailure {
    static readonly type = '[Topics] Unsubscribe from topic failure'
    constructor(public error: string) { }
}

//Delete Post
export class DeletePost {
    static readonly type = '[Topics] Deleting post'
    constructor(public id: number, public topicId: number) { }
}

export class DeletePostSuccess {
    static readonly type = '[Topics] Delete post succcess'
}

export class DeletePostFailure {
    static readonly  type = '[Topics] Delete post failure'
    constructor(public error: string) { }
}

export class SearchForTopic {
    static readonly type = '[Topics] Searching'
    constructor(public searchTerm: string) { }
}