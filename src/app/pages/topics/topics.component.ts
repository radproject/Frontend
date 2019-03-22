import { Component, OnInit } from '@angular/core';
import { ITopic } from 'src/app/models/topic.model';
import { Select, Store } from '@ngxs/store';
import { TopicsState } from 'src/app/ngxs/states/topics.state';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GetAllTopics } from 'src/app/ngxs/actions/topics.actions';
import { UserState } from 'src/app/ngxs/states/user.state';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {  
  @Select(TopicsState.getSelectedTopic)
  selectedTopic: Observable<ITopic>

  @Select(UserState.getUser)
  user$: Observable<IUser>

  constructor(private store: Store, public router: Router) { }

  ngOnInit() {
    this.store.dispatch(new GetAllTopics())
  }

  returnToIndex() {
    this.router.navigate(['/topics/browse'])
  }

  getTitle() {
    this.selectedTopic.subscribe(res => {
      if(res) {
        return res.Title
      }
      else {
        return ''
      }
    },
    err => {
      return ''
    })
  }
}
