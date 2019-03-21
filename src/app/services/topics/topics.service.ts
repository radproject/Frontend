import { Injectable } from '@angular/core';
import { ITopic } from 'src/app/models/topic.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { IPost } from 'src/app/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  constructor(private _http: HttpClient) { }

  //TOPICS
  GetAllTopics() {
    return this._http.get<ITopic[]>(`${environment.webApiURL}/topics/getall`)
  }

  GetAllByUser(id: string) {
    return this._http.get<ITopic[]>(`${environment.webApiURL}/topics/getallfortopic?UserId=${id}`)
  }

  CreateTopic(topic: Partial<ITopic>) {
    return this._http.post(`${environment.webApiURL}/topics/create`, topic)
  }

  DeleteTopic(id: number) {
    return this._http.post(`${environment.webApiURL}/topics/DeletePost`, id)
  }

  UpdateTopic(topic: ITopic) {
    return this._http.patch(`${environment.webApiURL}/topics/update`,topic)
  }

  GetTopicByID(id: number) {
    return this._http.get<ITopic>(`${environment.webApiURL}/topics/getbyid?id=${id}`)
  }

  //Subbing and unsubbing
  SubscribeToTopic(UserId: string, TopicId: number) {
    let body = {
      TopicId: TopicId,
      UserId: UserId
    }
    return this._http.post(`${environment.webApiURL}/topics/AddSubscriberToPost`, body)
  }

  UnsubscribeFromTopic(UserId: string, TopicId: number) {
    let body = {
      TopicId: TopicId,
      UserId: UserId
    }
    return this._http.post(`${environment.webApiURL}/topics/RemoveSubscriberFromPost`, body)
  }

  //POSTS
  GetPostByID(id: number) {
    return this._http.get<IPost>(`${environment.webApiURL}/posts/getbyid?id=${id}`)
  }

  GetPostsForThreadID(id: number) {
    return this._http.get<IPost[]>(`${environment.webApiURL}/posts/getforthread?id=${id}`)
  }

  CreatePost(text: string, threadID: number, userID: string) {
    let body =
    {
      ThreadID: threadID,
      UserId: userID,
      Text: text
    }
    return this._http.post(`${environment.webApiURL}/posts/create`, body)
  }

  UpdatePost(text: string, postID: number) {
    let body =
    {
      Text: text,
      ThreadID: postID
    }
    return this._http.patch(`${environment.webApiURL}/posts/update`,body)
  }

  DeletePost(id: number) {
    return this._http.post(`${environment.webApiURL}/posts/delete?id=${id}`,id)
  }


  GetPostsForTopic(id: number) {
    return this._http.get(`${environment.webApiURL}/getforthread?ThreadId=${id}`)
  }
}
