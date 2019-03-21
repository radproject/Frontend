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
  GetAllTopics(id: string) {
    return this._http.get<ITopic[]>(`${environment.webApiURL}/topics/getallfortopic?UserId=${id}`)
  }

  CreateTopic(topic: ITopic) {
    return this._http.post(`${environment.webApiURL}/topics/create`, topic)
  }

  DeleteTopic(id: number) {
    return this._http.post(`${environment.webApiURL}/topics/DeletePost`, id)
  }

  UpdateTopic(topic: ITopic) {
    return this._http.patch(`${environment.webApiURL}/topics/update`,topic)
  }

  GetTopicByID(id: number) {
    let tempTopic: ITopic = {
      ID: id,
      Title: `Topic ${id}`,
      CreationDate: new Date(),
      Creator: {
        StudentId: 'S00123456',
        Name: 'GetBy ID',
        email: 'sample.man@mail.itsligo.ie'
      },
      isPrivate: false,
      Posts: [
        {
          ID: 1,
          Text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          Creator: {
            StudentId: 'S00173047',
            Name: 'Daire Finn',
            email: 'daire.finn@mail.itsligo.ie'
          },
          TimeStamp:  1552453433000
        },
        {
          ID: 2,
          Text: 'Dorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          Creator: {
            StudentId: 'S00123456',
            Name: 'John Smith',
            email: 'john.smith@mail.itsligo.ie'
          },
          TimeStamp:  1552539833000
        }
      ]
    }
    return of(tempTopic)

    // return this._http.get<ITopic>(`${environment.webApiURL}/topics/getbyid?id=${id}`)
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
    return this._http.post(`${environment.webApiURL}/posts/DeletePost`, id)
  }
}
