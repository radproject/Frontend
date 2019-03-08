import { State, StateContext, Selector, Action } from "@ngxs/store"
import { NotificationService } from "src/app/services/notification/notification.service";
import { IUser } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth/auth.service";
import { GetUser, GetUserFailure, GetUserSuccess, LogoutUser, LogoutUserSuccess, LogoutUserFailure } from "../actions/user.actions";

interface UserStateModel {
    user: IUser,
    isLoading: boolean,
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
        const state = context.getState()
        state.isLoading = true;

        // this.authService.user$.subscribe(
        //     res => {
        //         context.dispatch(new GetUserSuccess(res))
        //     },
        //     err => {
        //         context.dispatch(new GetUserFailure(err))
        //     }
        // )
    }

    @Action(GetUserSuccess)
    GetUserSuccess(context: StateContext<UserStateModel>, action: GetUserSuccess) {
        context.patchState({
            user: action.payload,
            isLoading: false
        })
    }

    @Action(GetUserFailure)
    GetUserFailure(context: StateContext<UserStateModel>, action: GetUserFailure) {
        const state = context.getState()

        console.error(`Error getting User: + ${action.payload}`)
        this.notification.danger('Error getting User', action.payload)

        context.patchState({
            user: state.user,
            isLoading: false
        })
    }

    //Logout User
    @Action(LogoutUser)
    LogoutUser(context: StateContext<UserStateModel>, action: LogoutUser) {
        const state = context.getState()
        state.isLoading = true

        // this.authService.signOut()
        //     .then(res => { context.dispatch(new LogoutUserSuccess()) })
        //     .catch(err => { context.dispatch(new LogoutUserFailure(err)) })
    }

    @Action(LogoutUserSuccess)
    LogoutUserSuccess(context: StateContext<UserStateModel>, action: LogoutUserSuccess) {
        context.patchState({
            user: null
        })
    }

    @Action(LogoutUserFailure)
    LogoutUserFailure(context: StateContext<UserStateModel>, action: LogoutUserFailure) {
        const state = context.getState()

        console.error(`Error logging out: + ${action.payload}`)
        this.notification.danger('Error logging out', action.payload)

        context.patchState({
            user: state.user
        })
    }
}