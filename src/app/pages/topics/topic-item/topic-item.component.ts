import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { ClearSelectedTopic, GetTopicByID } from 'src/app/ngxs/actions/topics.actions';
import { ActivatedRoute } from '@angular/router';
import { TopicsState } from 'src/app/ngxs/states/topics.state';
import { Observable } from 'rxjs';
import { ITopic } from 'src/app/models/topic.model';
import { GetUserByID, ClearSelectedUser } from 'src/app/ngxs/actions/user.actions';
import { UserState } from 'src/app/ngxs/states/user.state';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-topic-item',
  templateUrl: './topic-item.component.html',
  styleUrls: ['./topic-item.component.scss']
})
export class TopicItemComponent implements OnInit, OnDestroy {
  postForm: FormGroup
    = new FormGroup({
      message: new FormControl(null, [Validators.required])
    })

  @Select(TopicsState.getSelectedTopic)
  topic$: Observable<ITopic>

  @Select(TopicsState.getSelectedLoading)
  isLoading$: Observable<boolean>

  constructor(private store: Store, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id']
    this.store.dispatch(new GetTopicByID(id))
  }

  ngOnDestroy() {
    this.store.dispatch(new ClearSelectedTopic())
  }

  tryPost() {
    //TODO: Write post
  }
}
