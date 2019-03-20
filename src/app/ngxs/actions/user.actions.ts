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

//Login
export class LoginUser {
    static readonly type = '[User] Login'
    constructor(public email: string, public password: string) { }
}

export class LoginUserSuccess {
    static readonly type = '[User] Login Success'
}

export class LoginUserFailure {
    static readonly type = '[User] Login Failure'
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

//Register
export class RegisterUser {
    static readonly type = '[User] Register'
    constructor(public email: string, public password: string) { }
}

export class RegisterUserSuccess { 
    static readonly type = '[User] Registration Successful'
}

export class RegisterUserFailure {
    static readonly type = '[User] Registration Failure'
    constructor(public error: string) { }
}