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
    let sampleTopics: ITopic[] = 
    [
      {
          ID: 1,
          Title: 'Topic 1',
          CreationDate: new Date(),
          Creator: {
            StudentId: 'S00173047',
            Name: 'Daire Finn',
            email: 'daire.finn@mail.itsligo.ie'
          },
          isPrivate: true
      },
      {
          ID: 2,
          Title: 'Topic 2',
          CreationDate: new Date(),
          Creator: {
            StudentId: 'S00173047',
            Name: 'Daire Finn',
            email: 'daire.finn@mail.itsligo.ie'
          },
          isPrivate: false
      },
      {
          ID: 3,
          Title: 'Topic 3',
          CreationDate: new Date(),
          Creator: {
            StudentId: 'S00173047',
            Name: 'Daire Finn',
            email: 'daire.finn@mail.itsligo.ie'            
          },
          isPrivate: false
      }
    ]
    return of(sampleTopics)

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
