import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { ClearSelectedTopic, GetTopicByID } from 'src/app/ngxs/actions/topics.actions';
import { ActivatedRoute } from '@angular/router';
import { TopicsState } from 'src/app/ngxs/states/topics.state';
import { Observable } from 'rxjs';
import { ITopic } from 'src/app/models/topic.model';
import { GetUserByID, ClearSelectedUser } from 'src/app/ngxs/actions/user.actions';

@Component({
  selector: 'app-topic-item',
  templateUrl: './topic-item.component.html',
  styleUrls: ['./topic-item.component.scss']
})
export class TopicItemComponent implements OnInit, OnDestroy {
  @Select(TopicsState.getSelectedTopic)
  topic$: Observable<ITopic>

  @Select(TopicsState.getSelectedLoading)
  isLoading$: Observable<boolean>

  constructor(private store: Store, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id']
    this.store.dispatch(new GetTopicByID(id))

    this.topic$.subscribe(res => { this.store.dispatch(new GetUserByID(res.CreatorId))})
  }

  ngOnDestroy() {
    this.store.dispatch(new ClearSelectedTopic())
    this.store.dispatch(new ClearSelectedUser())
  }

}
