import { ITopic } from "src/app/models/topic.model";

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
    constructor(public topic: ITopic) { }
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
    constructor(public topicIDs: number[]) { }
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