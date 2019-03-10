import { IUser } from "src/app/models/user.model";

//Get User
export class GetUser {
    static readonly type = '[User] Get User'
}

export class GetUserSuccess {
    static readonly type = '[User] Get User Success'
    constructor(public user: IUser) { }
}

export class GetUserFailure {
    static readonly type = '[User] Get User Failure'
    constructor(public error: string) { }
}

//Logout
export class LogoutUser {
    static readonly type = '[User] Logout User'
}

export class LogoutUserSuccess {
    static readonly type = '[User] Logout User Success'
}

export class LogoutUserFailure {
    static readonly type = '[User] Logout User Failure'
    constructor(public error: string) { }
}

//Get user by ID
export class GetUserByID {
    static readonly type = '[User] Getting user by ID'
    constructor(public id: string) { }
}

export class GetUserByIDSuccess {
    static readonly type = '[User] Get user by ID success'
    constructor(public user: IUser) { }
}

export class GetUserByIDFailure {
    static readonly type = '[User] Get user by ID failure'
    constructor(public error: string) { }
}

export class ClearSelectedUser {
    static readonly type = '[User] Clear selected user'
}

//Subscribe to topic
export class SubscribeToTopic {
    static readonly type = '[User] Subscribe to topic'
    constructor(public id: number) { }
}

export class SubscribeToTopicSuccess {
    static readonly type = '[User] Subscribe to topic success'
}

export class SubscribeToTopicFailure {
    static readonly type = '[User] Subscribe to topic failure'
    constructor(public error: string) { }
}

//Unsubscribe from topic
export class UnsubscribeFromTopic {
    static readonly type = '[User] Unsubscrube from topic'
    constructor(public id: number) { }
}

export class UnsubscribeFromTopicSuccess {
    static readonly type = '[User] Unsubscribe from topic success'
}

export class UnsubscribeFromTopicFailure {
    static readonly type = '[User] Unsubscribe from topic failure'
    constructor(public error: string) { }
}