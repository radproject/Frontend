import { Injectable } from '@angular/core';
import { ITopic } from 'src/app/models/topic.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  constructor(private _http: HttpClient) { }

  //CRUD operations
  GetAllTopics() {
    return of(
      [
        {
            ID: 1,
            Title: 'Topic 1',
            CreationDate: new Date(),
            CreatorId: '1',
            SubscribedIds: ['foo','bar'],
            isPrivate: true
        },
        {
            ID: 2,
            Title: 'Topic 2',
            CreationDate: new Date(),
            CreatorId: '2',
            SubscribedIds: ['foo','bar'],
            isPrivate: false
        },
        {
            ID: 3,
            Title: 'Topic 3',
            CreationDate: new Date(),
            CreatorId: '3',
            SubscribedIds: ['foo','bar'],
            isPrivate: false
        }
    ]
    )
    // return this._http.get<ITopic[]>(`${environment.webApiURL}/posts/getall`)
  }

  CreateTopic(topic: ITopic) {
    return this._http.post(`${environment.webApiURL}/posts/create`, topic)
  }

  DeleteTopic(id: number) {
    return this._http.post(`${environment.webApiURL}/posts/DeletePost`, id)
  }

  GetTopicByID(id: number) {
    let tempTopic: ITopic = {
      ID: id,
      Title: `Topic ${id}`,
      CreationDate: new Date(),
      CreatorId: '1',
      isPrivate: false
    }
    return of(tempTopic)

    // return this._http.get<ITopic>(`${environment.webApiURL}/posts/getbyid?id=${id}`)
  }

  //Subbing and unsubbing
  SubscribeToTopic(UserId: string, TopicId: number) {
    let body = {
      TopicId: TopicId,
      UserId: UserId
    }
    return this._http.post(`${environment.webApiURL}/posts/AddSubscriberToPost`, body)
  }

  UnsubscribeFromTopic(UserId: string, TopicId: number) {
    let body = {
      TopicId: TopicId,
      UserId: UserId
    }
    return this._http.post(`${environment.webApiURL}/posts/RemoveSubscriberFromPost`, body)
  }
}
