import { State, StateContext, Selector, Action, Select } from "@ngxs/store"
import { NotificationService } from "src/app/services/notification/notification.service";
import { ITopic } from "src/app/models/topic.model";
import { GetAllTopics, GetAllTopicsSuccess, GetAllTopicsFailure, CreateTopic, CreateTopicSuccess, CreateTopicFailure, DeleteTopic, DeleteTopicSuccess, DeleteTopicFailure, GetSubscribedTopics, GetSubscribedTopicsSuccess, GetSubscribedTopicsFailure, GetTopicByID, GetTopicByIDSuccess, GetTopicByIDFailure, ClearSelectedTopic, AddPostToTopic, AddPostToTopicSuccess, AddPostToTopicFailure, SubscribeToTopicSuccess, SubscribeToTopicFailure, UnsubscribeFromTopic, UnsubscribeFromTopicSuccess, UnsubscribeFromTopicFailure, SubscribeToTopic, DeletePost, DeletePostSuccess, DeletePostFailure, SearchForTopic } from "../actions/topics.actions";
import { TopicsService } from "src/app/services/topics/topics.service";
import { UserState } from "./user.state";
import { Observable } from "rxjs";
import { IUser } from "src/app/models/user.model";

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

    @Select(UserState.getUser)
    user$: Observable<IUser>

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
        context.patchState({
            isLoading: true
        })
        
        this.topicsService.GetAllTopics().subscribe(
            res => {
                context.dispatch(new GetAllTopicsSuccess(res))

                this.user$.subscribe(u => {
                    if(u)
                    {
                        context.dispatch(new GetSubscribedTopics(u.Id))
                    }
                })
            },
            err => {
                context.dispatch(new GetAllTopicsFailure(err.error.Message))
        })
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
                context.dispatch(new CreateTopicFailure(err.error.Message))
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
                context.dispatch(new DeleteTopicFailure(err.error.Message))
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
        context.patchState({
            subscribedLoading: true
        })
        
        this.topicsService.GetSubscribedTopics(action.userID).subscribe(
            res => {
                context.dispatch(new GetSubscribedTopicsSuccess(res))
            },
            err => {
                context.dispatch(new GetSubscribedTopicsFailure(err.error.Message))
            }
        )
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
        context.patchState({
            selectedLoading: true
        })

        this.topicsService.GetTopicByID(action.id).subscribe(
             res => {
                 context.dispatch(new GetTopicByIDSuccess(res))
             },
             err => {
                 context.dispatch(new GetTopicByIDFailure(err.error.Message))
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

    @Action(ClearSelectedTopic)
    ClearSelectedTopic(context: StateContext<TopicsStateModel>, action: ClearSelectedTopic) {
        context.patchState({
            selectedTopic: null
        })
    }

    //Add post to topic
    @Action(AddPostToTopic)
    AddPostToTopic(context: StateContext<TopicsStateModel>, action: AddPostToTopic) {
        this.topicsService.CreatePost(action.post.Text, action.topicID, action.post.Creator.StudentId)
        .subscribe(
            res => {
                context.dispatch(new AddPostToTopicSuccess())
            },
            err => {
                context.dispatch(new AddPostToTopicFailure(err.error.Message))
            }
        )
    }

    @Action(AddPostToTopicSuccess)
    AddPostToTopicSuccess(context: StateContext<TopicsStateModel>, action: AddPostToTopicSuccess) {
        console.info('Post added to topic')
    }

    @Action(AddPostToTopicFailure)
    AddPostToTopicFailure(context: StateContext<TopicsStateModel>, action: AddPostToTopicFailure) {
        console.error(`Error gettting topic: + ${action.error}`)
        this.notification.danger('Error getting topic', action.error)
    }    
    
    //Sub to topic    
    @Action(SubscribeToTopic)
    SubscribeToTopic(context: StateContext<TopicsStateModel>, action: SubscribeToTopic) {
        this.user$.subscribe(
            user => {
                if(user != null)
                {
                    this.topicsService.SubscribeToTopic(user.StudentId, action.id).subscribe(
                        res => {
                            context.dispatch(new SubscribeToTopicSuccess())
                        },
                        err => {
                            context.dispatch(new SubscribeToTopicFailure(err.error.error_description))
                        }
                    ).unsubscribe()
                }
                else
                {
                    context.dispatch(new SubscribeToTopicFailure('No user'))
                }
            },
            err => {
                context.dispatch(new SubscribeToTopicFailure(err.error.Message))
            }
        ).unsubscribe()
    }

    @Action(SubscribeToTopicSuccess)
    SubscribeToTopicSuccess(context: StateContext<TopicsStateModel>, action: SubscribeToTopicSuccess) {
        context.patchState({
            isLoading:false
        })
    }

    @Action(SubscribeToTopicFailure)
    SubscribeToTopicFailure(context: StateContext<TopicsStateModel>, action: SubscribeToTopicFailure) {
        console.error(`Error subscribing to topic: + ${action.error}`)
        this.notification.danger('Error subscribing to topic', action.error)
    }

    //Unsub from topic
    @Action(UnsubscribeFromTopic)
    UnsubscribeFromTopic(context: StateContext<TopicsStateModel>, action: UnsubscribeFromTopic) {
        this.user$.subscribe(
            user => {
                if(user != null)
                {
                    this.topicsService.UnsubscribeFromTopic(user.StudentId, action.id).subscribe(
                        res => {
                            context.dispatch(new UnsubscribeFromTopicSuccess())
                        },
                        err => {
                            context.dispatch(new UnsubscribeFromTopicFailure(err))
                        }
                    ).unsubscribe()
                }
                else
                {
                    context.dispatch(new UnsubscribeFromTopicFailure('No user'))
                }
            },
            err => {
                context.dispatch(new UnsubscribeFromTopicFailure('err'))
            }
        ).unsubscribe()
    }

    @Action(UnsubscribeFromTopicSuccess)
    UnsubscribeFromTopicSuccess(context: StateContext<TopicsStateModel>, action: UnsubscribeFromTopicSuccess) { }

    @Action(UnsubscribeFromTopicFailure)
    UnsubscribeFromTopicFailure(context: StateContext<TopicsStateModel>, action: UnsubscribeFromTopicFailure) {
        console.error(`Error unsubscribing from topic: + ${action.error}`)
        this.notification.danger('Error unsubscribing from topic', action.error)
    }

    //DELETE POST
    @Action(DeletePost)
    DeletePost(context: StateContext<TopicsStateModel>, action: DeletePost) {
        this.topicsService.DeletePost(action.id).subscribe(
            res => {
                context.dispatch(new DeletePostSuccess())
            },
            err => {
                context.dispatch(new DeletePostFailure(err.error.Message))
            }
        )   
    }

    @Action(DeletePostSuccess)
    DeletePostSuccess(context: StateContext<TopicsStateModel>, action: DeletePostSuccess) { }

    @Action(DeletePostFailure)
    DeletePostFailure(context: StateContext<TopicsStateModel>, action: DeletePostFailure) {
        console.error(`Error deleting topic topic: + ${action.error}`)
        this.notification.danger('Error deleting topic', action.error)
    }

    //Search
    @Action(SearchForTopic)
    SearchForTopic(context: StateContext<TopicsStateModel>, action: SearchForTopic) {
        const subbedTopics = context.getState().subscribedTopics
        const topics = context.getState().topics
        context.patchState({
            isLoading: true,
            topics: [],
            subscribedTopics: [],
            subscribedLoading: true
        })

        let filteredSubbedTopics = []
        let filteredTopics = []

        if(action.searchTerm.length > 0) {
            subbedTopics.forEach(t => {
                if(t.Title)
                {
                    if(t.Title.includes(action.searchTerm))
                    { filteredSubbedTopics.push(t) }
                }
            })
            topics.forEach(t => {
                if(t.Title)
                {
                    if(t.Title.includes(action.searchTerm))
                    { filteredTopics.push(t) }
                }
            })

              context.dispatch(new GetAllTopicsSuccess(filteredTopics))
              context.dispatch(new GetSubscribedTopicsSuccess(filteredSubbedTopics))
        }
        else {
            context.dispatch(new GetAllTopics())
        }
    }
}