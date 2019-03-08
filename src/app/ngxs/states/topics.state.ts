import { State, StateContext, Selector, Action } from "@ngxs/store"
import { NotificationService } from "src/app/services/notification/notification.service";
import { ITopic } from "src/app/models/topic.model";
import { GetAllTopics, GetAllTopicsSuccess, GetAllTopicsFailure, CreateTopic, CreateTopicSuccess, CreateTopicFailure, DeleteTopic, DeleteTopicSuccess, DeleteTopicFailure, GetSubscribedTopics, GetSubscribedTopicsSuccess, GetSubscribedTopicsFailure, GetTopicByID, GetTopicByIDSuccess, GetTopicByIDFailure, SubscribeToTopic, SubscribeToTopicSuccess, SubscribeToTopicFailure, UnsubscribeFromTopic, UnsubscribeFromTopicSuccess, UnsubscribeFromTopicFailure } from "../actions/topics.actions";
import { TopicsService } from "src/app/services/topics/topics.service";

interface TopicsStateModel {
    topics: ITopic[],
    isLoading: boolean,
    
    selectedTopic: ITopic,
    selectedLoading: boolean,

    subscribedTopics: ITopic[],
    subscribedLoading: boolean
}

@State<TopicsStateModel>({
    name: 'topics',
    defaults: {
        topics: null,
        isLoading: false,
        selectedTopic: null,
        selectedLoading: false,
        subscribedTopics: null,
        subscribedLoading: false
    }
})
export class TopicsState {
    constructor(private topicsService: TopicsService,private notification: NotificationService) { }

    //Selectors
    //All Topics
    @Selector()
    static getTopics(state: TopicsStateModel) {
        return state.topics
    }
    @Selector()
    static getIsLoading(state: TopicsStateModel) {
        return state.isLoading
    }

    //Selected topic
    @Selector()
    static getSelectedTopic(state: TopicsStateModel) {
        return state.selectedTopic
    }
    @Selector()
    static getSelectedLoading(state: TopicsStateModel) {
        return state.selectedLoading
    }

    //Subbed topic
    @Selector()
    static getSubbedTopics(state: TopicsStateModel) {
        return state.subscribedTopics
    }
    @Selector()
    static getSubbedLoading(state: TopicsStateModel) {
        return state.subscribedLoading
    }

    //Actions
    //Get Topics
    @Action(GetAllTopics)
    GetAllTopics(context: StateContext<TopicsStateModel>, action: GetAllTopics) {
        const state = context.getState()
        state.isLoading = true

        //TODO: CALL SERVICE TO GET ALL TOPICS THEN PARSE RESPONSE

        // this.topicsService.GetAllTopics()
        //     .then(res => {
        //         context.dispatch(new GetAllTopicsSuccess(res))
        //     })
        //     .catch(err => {
        //         context.dispatch(new GetAllTopicsFailure(err))
        //     })
    }

    @Action(GetAllTopicsSuccess)
    GetAllTopicsSuccess(context: StateContext<TopicsStateModel>, action: GetAllTopicsSuccess) {
        context.patchState({
            topics: action.topics,
            isLoading: false
        })
    }

    @Action(GetAllTopicsFailure)
    GetAllTopicsFailure(context: StateContext<TopicsStateModel>, action: GetAllTopicsFailure) {
        console.error(`Error getting Topics: + ${action.error}`)
        this.notification.danger('Error getting Topics', action.error)

        context.patchState({
            isLoading: false
        })
    }
    
    //Add topics
    @Action(CreateTopic)
    CreateTopic(context: StateContext<TopicsStateModel>, action: CreateTopic) {
        const state = context.getState()
        state.isLoading = true

        this.topicsService.CreateTopic(action.topic).toPromise()
            .then(res => {
                context.dispatch(new CreateTopicSuccess())
            })
            .catch(err => {
                context.dispatch(new CreateTopicFailure(err))
            })

    }

    @Action(CreateTopicSuccess)
    CreateTopicSuccess(context: StateContext<TopicsStateModel>, action: CreateTopicSuccess) {
        context.patchState({
            isLoading: false
        })
    }

    @Action(CreateTopicFailure)
    CreateTopicFailure(context: StateContext<TopicsStateModel>, action: CreateTopicFailure) {
        console.error(`Error adding topics: + ${action.error}`)
        this.notification.danger('Error adding topics', action.error)

        context.patchState({
            isLoading: false
        })
    }

    //Delete topics
    @Action(DeleteTopic)
    DeleteTopic(context: StateContext<TopicsStateModel>, action: DeleteTopic) {
        const state = context.getState()
        state.isLoading = true

        this.topicsService.DeleteTopic(action.id).toPromise()
            .then(res => {
                context.dispatch(new DeleteTopicSuccess())
            })
            .catch(err => {
                context.dispatch(new DeleteTopicFailure(err))
            })
    }

    @Action(DeleteTopicSuccess)
    DeleteTopicSuccess(context: StateContext<TopicsStateModel>, action: DeleteTopicSuccess) {
        context.patchState({
            isLoading: false
        })
    }

    @Action(DeleteTopicFailure)
    DeleteTopicFailure(context: StateContext<TopicsStateModel>, action: DeleteTopicFailure) {
        console.error(`Error deleting topic: + ${action.error}`)
        this.notification.danger('Error deleting topic:', action.error)

        context.patchState({
            isLoading: false
        })
    }

    //Get Subbed topics
    @Action(GetSubscribedTopics)
    GetSubscribedTopics(context: StateContext<TopicsStateModel>, action: GetSubscribedTopics) {
        const state = context.getState();
        state.subscribedLoading = true
        
        //TODO: GET SUBBED TOPICS BASED ON STUDENT ID THEN PARSE RESPONSE

        // this.topicsService.getSubscribedTopics(action.studentID).subscribe(
        //     res => {
        //         context.dispatch(new GetSubscribedTopicsSuccess(res))
        //     },
        //     err => {
        //         context.dispatch(new GetSubscribedTopicsFailure(err))
        //     }
        // )
    }

    @Action(GetSubscribedTopicsSuccess)
    GetSubscribedTopicsSuccess(context: StateContext<TopicsStateModel>, action: GetSubscribedTopicsSuccess) {
        context.patchState({
            subscribedTopics: action.topics,
            subscribedLoading: false
        })
    }

    @Action(GetSubscribedTopicsFailure)
    GetSubscribedTopicsFailure(context: StateContext<TopicsStateModel>, action: GetSubscribedTopicsFailure) {
        console.error(`Error gettting subscribed topics: + ${action.error}`)
        this.notification.danger('Error getting subscribed topics', action.error)

        context.patchState({
            subscribedLoading: false
        })
    }

    //Get Topic By ID
    @Action(GetTopicByID)
    GetTopicByID(context: StateContext<TopicsStateModel>, action: GetTopicByID) {
        const state = context.getState()
        state.selectedLoading = true

        this.topicsService.GetTopicByID(action.id).subscribe(
             res => {
                 context.dispatch(new GetTopicByIDSuccess(res))
             },
             err => {
                 context.dispatch(new GetTopicByIDFailure(err))
             }
        )
    }

    @Action(GetTopicByIDSuccess)
    GetTopicByIDSuccess(context: StateContext<TopicsStateModel>, action: GetTopicByIDSuccess) {
        context.patchState({
            selectedTopic: action.topic,
            selectedLoading: false
        })
    }

    @Action(GetTopicByIDFailure)
    GetTopicByIDFailure(context: StateContext<TopicsStateModel>, action: GetTopicByIDFailure) {
        console.error(`Error gettting topic: + ${action.error}`)
        this.notification.danger('Error getting topic', action.error)

        context.patchState({
            selectedLoading: false
        })
    }

    //Sub to topic    
    @Action(SubscribeToTopic)
    SubscribeToTopic(context: StateContext<TopicsStateModel>, action: SubscribeToTopic) {
        const state = context.getState()
        state.subscribedLoading = true

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
    SubscribeToTopicSuccess(context: StateContext<TopicsStateModel>, action: SubscribeToTopicSuccess) {
        context.patchState({
            subscribedLoading: false
        })
    }

    @Action(SubscribeToTopicFailure)
    SubscribeToTopicFailure(context: StateContext<TopicsStateModel>, action: SubscribeToTopicFailure) {
        console.error(`Error subscribing to topic: + ${action.error}`)
        this.notification.danger('Error subscribing to topic', action.error)

        context.patchState({
            subscribedLoading: false
        })
    }

    //Unsub from topic
    @Action(UnsubscribeFromTopic)
    UnsubscribeFromTopic(context: StateContext<TopicsStateModel>, action: UnsubscribeFromTopic) {
        const state = context.getState()
        state.subscribedLoading = true

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
    UnsubscribeFromTopicSuccess(context: StateContext<TopicsStateModel>, action: UnsubscribeFromTopicSuccess) {
        context.patchState({
            subscribedLoading: false
        })
    }

    @Action(UnsubscribeFromTopicFailure)
    UnsubscribeFromTopicFailure(context: StateContext<TopicsStateModel>, action: UnsubscribeFromTopicFailure) {
        console.error(`Error unsubscribing from topic: + ${action.error}`)
        this.notification.danger('Error unsubscribing from topic', action.error)

        context.patchState({
            subscribedLoading: false
        })
    }

}