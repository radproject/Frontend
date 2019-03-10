import { State, StateContext, Selector, Action } from "@ngxs/store"
import { NotificationService } from "src/app/services/notification/notification.service";
import { IUser } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth/auth.service";
import { GetUser, GetUserFailure, GetUserSuccess, LogoutUser, LogoutUserSuccess, LogoutUserFailure, GetUserByID, GetUserByIDSuccess, GetUserByIDFailure, SubscribeToTopic, SubscribeToTopicSuccess, SubscribeToTopicFailure, UnsubscribeFromTopic, UnsubscribeFromTopicFailure, UnsubscribeFromTopicSuccess, ClearSelectedUser } from "../actions/user.actions";

interface UserStateModel {
    user: IUser,
    isLoading: boolean,

    selectedUser: IUser,
    selectedLoading: boolean
}

@State<UserStateModel>({
    name: 'user',
    defaults: {
        user: null,
        isLoading: false,

        selectedUser: null,
        selectedLoading: false
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

        //TEMP
        let user: IUser = {
            StudentId: 'S00173047',
            Name: 'Daire Finn',
            email: 'S00173047@mail.itsligo.ie',
            subscribedTopics: [1,2,3]
        }

        context.dispatch(new GetUserSuccess(user))

        //TODO: LINK AUTH WITH BACKEND
        //
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
            user: action.user,
            isLoading: false
        })
    }

    @Action(GetUserFailure)
    GetUserFailure(context: StateContext<UserStateModel>, action: GetUserFailure) {
        console.error(`Error getting User: + ${action.error}`)
        this.notification.danger('Error getting User', action.error)

        context.patchState({
            isLoading: false
        })
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

    //Get user by ID
    @Action(GetUserByID)
    GetUserByID(context: StateContext<UserStateModel>, action: GetUserByID) {
        context.patchState({
            selectedLoading: true
        })

        //TEMP
        let user: IUser = {
            StudentId: 'S00123456',
            Name: 'John Doe',
            email: 'S00123456@mail.itsligo.ie',
            subscribedTopics: [4,5,6]
        }

        //TODO: LINK TO AUTH SERVICE

        context.dispatch(new GetUserByIDSuccess(user))
    }

    @Action(GetUserByIDSuccess)
    GetUserByIDSuccess(context: StateContext<UserStateModel>, action: GetUserByIDSuccess) {
        context.patchState({
            selectedUser: action.user,
            selectedLoading: false
        })
    }

    @Action(GetUserByIDFailure)
    GetUserByIDFailure(context: StateContext<UserStateModel>, action: GetUserByIDFailure) { 
        console.error(`Error getting user by ID: + ${action.error}`)
        this.notification.danger('Error getting user by ID', action.error)

        context.patchState({
            selectedLoading: false
        })
    }

    @Action(ClearSelectedUser)
    ClearSelectedUser(context: StateContext<UserStateModel>, action: ClearSelectedUser) {
        context.patchState({
            user: null
        })
    }
    
    //Sub to topic    
    @Action(SubscribeToTopic)
    SubscribeToTopic(context: StateContext<UserStateModel>, action: SubscribeToTopic) {
        //TEMP
        let newUser = (context.getState()).user
        newUser.subscribedTopics.push(action.id)

        context.patchState({
            user: newUser
        })
        //TODO: SUBSCRIBE TO TOPIC THEN PARSE RESPONSE

        //this.topicsService.subscribeToTopic(action.id).subscribe(
        //      res => {
        //          context.dispatch(new SubscribeToTopicSuccess())
        //      },
        //      err => {
        //          context.dispatch(new SubscribeToTopicFailure(err))
        //      }
        //)
    }

    @Action(SubscribeToTopicSuccess)
    SubscribeToTopicSuccess(context: StateContext<UserStateModel>, action: SubscribeToTopicSuccess) {
        context.patchState({
            isLoading:false
        })
    }

    @Action(SubscribeToTopicFailure)
    SubscribeToTopicFailure(context: StateContext<UserStateModel>, action: SubscribeToTopicFailure) {
        console.error(`Error subscribing to topic: + ${action.error}`)
        this.notification.danger('Error subscribing to topic', action.error)
    }

    //Unsub from topic
    @Action(UnsubscribeFromTopic)
    UnsubscribeFromTopic(context: StateContext<UserStateModel>, action: UnsubscribeFromTopic) {
        //TEMP
        let newUser = (context.getState()).user
        let index = newUser.subscribedTopics.findIndex(t => t == action.id)
        newUser.subscribedTopics.splice(index,1);

        context.patchState({
            user: newUser
        })
        //TODO: UNSUBSCRIBE FROM TOPIC THEN PARSE RESPONSE

        //this.topicsService.unsubscribeFromTopic(action.id).subscribe(
        //      res => {
        //          context.dispatch(new UnsubscribeFromTopicSuccess())
        //      },
        //      err => {
        //          context.dispatch(new UnsubscribeFromTopicFailure(err))
        //      }
        //)
    }

    @Action(UnsubscribeFromTopicSuccess)
    UnsubscribeFromTopicSuccess(context: StateContext<UserStateModel>, action: UnsubscribeFromTopicSuccess) {
    }

    @Action(UnsubscribeFromTopicFailure)
    UnsubscribeFromTopicFailure(context: StateContext<UserStateModel>, action: UnsubscribeFromTopicFailure) {
        console.error(`Error unsubscribing from topic: + ${action.error}`)
        this.notification.danger('Error unsubscribing from topic', action.error)
    }
}