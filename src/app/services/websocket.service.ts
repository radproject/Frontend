import { Injectable } from '@angular/core';
import * as SignalR from '@aspnet/signalr'
import { NotificationService } from './notification/notification.service';
import { environment } from 'src/environments/environment';
import { IPost } from '../models/post.model';
import { Select } from '@ngxs/store';
import { TopicsState } from '../ngxs/states/topics.state';
import { Observable } from 'rxjs';
import { ITopic } from '../models/topic.model';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  websocketConnection: SignalR.HubConnection
  @Select(TopicsState.getTopics) topics$: Observable<ITopic[]>
  topics: ITopic[]

  constructor(private _notification: NotificationService) {
    // this.topics$.subscribe(topics => {
    //   this.topics = topics;
    //   this.websocketConnection = new SignalR.HubConnectionBuilder().withUrl(`${environment.webApiURL}/signalr`).build();
    //   this.websocketConnection.on('SendNewPostToConnection', (post: IPost) => {
    //     this.topics.find(x => x.ID === post.ID)
    //   })
    // })
  }
}
