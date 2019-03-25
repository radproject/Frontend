import { State, StateContext, Selector, Action } from "@ngxs/store"
import { NotificationService } from "src/app/services/notification/notification.service";
import { IUser } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth/auth.service";
import { GetUser, GetUserFailure, GetUserSuccess, LogoutUser, LogoutUserSuccess, LogoutUserFailure, LoginUser, LoginUserSuccess, LoginUserFailure, RegisterUser, RegisterUserSuccess, RegisterUserFailure } from "../actions/user.actions";

interface UserStateModel {
    user: IUser,
    isLoading: boolean
}

@State<UserStateModel>({
    name: 'user',
    defaults: {
        user: null,
        isLoading: false
    }
})
export class UserState {
    constructor(private authService: AuthService, private notification: NotificationService) { }

    //Selectors
    @Selector()
    static getUser(state: UserStateModel) {
        return state.user
    }

    @Selector()
    static getIsLoading(state: UserStateModel) {
        return state.isLoading
    }

    //Actions
    //Get User
    @Action(GetUser)
    GetUser(context: StateContext<UserStateModel>, action: GetUser) {
        context.patchState({
            isLoading: true
        })

        this.authService.getUser().subscribe(
            res => {
                if (res) {
                    context.dispatch(new GetUserSuccess(res))
                }
                else {
                    context.dispatch(new GetUserFailure('Err'))
                }
            },
            err => {
                context.dispatch(new GetUserFailure(err))
            }
        )
    }

    @Action(GetUserSuccess)
    GetUserSuccess(context: StateContext<UserStateModel>, action: GetUserSuccess) {
        context.patchState({
            user: action.user,
            isLoading: false
        })
    }

    @Action(GetUserFailure)
    GetUserFailure(context: StateContext<UserStateModel>, action: GetUserFailure) {
        console.error(`Error getting User: + ${action.error}`)
        this.notification.danger('Error getting User', action.error)
        console.log(action.error)
        context.patchState({
            isLoading: false
        })
    }

    //Login User
    @Action(LoginUser)
    LoginUser(context: StateContext<UserStateModel>, action: LoginUser) {

    }

    @Action(LoginUserSuccess)
    LoginUserSuccess(context: StateContext<UserStateModel>, action: LoginUser) {

    }

    @Action(LoginUserFailure)
    LoginUserFailure(context: StateContext<UserStateModel>, action: LoginUserFailure) {

    }

    //Logout User
    @Action(LogoutUser)
    LogoutUser(context: StateContext<UserStateModel>, action: LogoutUser) {
        context.patchState({
            isLoading: true
        })

        //TODO: LINK WITH AUTH SERVICE
        //
        // this.authService.signOut()
        //     .then(res => { context.dispatch(new LogoutUserSuccess()) })
        //     .catch(err => { context.dispatch(new LogoutUserFailure(err)) })
    }

    @Action(LogoutUserSuccess)
    LogoutUserSuccess(context: StateContext<UserStateModel>, action: LogoutUserSuccess) {
        context.patchState({
            user: null,
            isLoading: false
        })
    }

    @Action(LogoutUserFailure)
    LogoutUserFailure(context: StateContext<UserStateModel>, action: LogoutUserFailure) {
        console.error(`Error logging out: + ${action.error}`)
        this.notification.danger('Error logging out', action.error)

        context.patchState({
            isLoading: false
        })
    }

    //Register User
    @Action(RegisterUser)
    RegisterUser(context: StateContext<UserStateModel>, action: RegisterUser) {

    }

    @Action(RegisterUserSuccess)
    RegisterUserSuccess(context: StateContext<UserStateModel>, action: RegisterUserSuccess) {

    }

    @Action(RegisterUserFailure)
    RegisterUserFailure(context: StateContext<UserStateModel>, action: RegisterUserFailure) {

    }
}