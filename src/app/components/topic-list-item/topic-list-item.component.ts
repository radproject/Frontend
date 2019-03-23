import { Component, OnInit, Input } from '@angular/core';
import { ITopic } from 'src/app/models/topic.model';
import { UserState } from 'src/app/ngxs/states/user.state';
import { IUser } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';

@Component({
  selector: 'topic-list-item',
  templateUrl: './topic-list-item.component.html',
  styleUrls: ['./topic-list-item.component.scss']
})
export class TopicListItemComponent implements OnInit {
  @Input('TopicIn') topic: ITopic

  @Select(UserState.getUser)
  user$: Observable<IUser>
  
  constructor() { }

  ngOnInit() {
  }

}
