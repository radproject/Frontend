import { IUser } from "src/app/models/user.model";

//Get User
export class GetUser {
    static readonly type = '[User] Get User'
}

export class GetUserSuccess {
    static readonly type = '[User] Get User Success'
    constructor(public payload: IUser) { }
}

export class GetUserFailure {
    static readonly type = '[User] Get User Failure'
    constructor(public payload: string) { }
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
    constructor(public payload: string) { }
}