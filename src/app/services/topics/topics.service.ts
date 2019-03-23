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

  CreateTopic(topic: Partial<ITopic>) {
    let body = {
      Title: topic.Title,
      CreationDate: new Date(),
      isPrivate: topic.isPrivate
    }
    return this._http.post(`${environment.webApiURL}/topics/create`, body)
  }

  DeleteTopic(id: number) {
    return this._http.post(`${environment.webApiURL}/topics/delete?id=${id}`, id)
  }

  UpdateTopic(topic: ITopic) {
    return this._http.patch(`${environment.webApiURL}/topics/update`,topic)
  }

  GetTopicByID(id: number) {
    return this._http.get<ITopic>(`${environment.webApiURL}/topics/getbyid?id=${id}`)
  }

  //Subbing and unsubbing
  SubscribeToTopic(UserId: string, TopicId: number) {
    if(UserId)
    { UserId = `&UserId=${UserId}` }
    else
    { UserId = 'none' }
    return this._http.post(`${environment.webApiURL}/topics/subscribe?TopicId=${TopicId}&UserId=${UserId}`, null)
  }

  UnsubscribeFromTopic(UserId: string, TopicId: number) {
    if(UserId)
    { UserId = `&UserId=${UserId}` }
    else
    { UserId = 'none' }
    return this._http.post(`${environment.webApiURL}/topics/unsubscribe?TopicId=${TopicId}&UserId=${UserId}`, null)
  }

  //POSTS
  GetPostByID(id: number) {
    return this._http.get<IPost>(`${environment.webApiURL}/posts/getbyid?id=${id}`)
  }

  GetPostsForThreadID(id: number) {
    return this._http.get<IPost[]>(`${environment.webApiURL}/posts/getforthread?id=${id}`)
  }

  CreatePost(text: string, threadID: number) {
    let body =
    {
      ThreadId: threadID,
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

  GetSubscribedTopics(id: string) {
    return this._http.get<ITopic[]>(`${environment.webApiURL}/topics/getsubscribedtopics?UserId=${id}`)
  }
}
