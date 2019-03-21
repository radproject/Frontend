import { Component, OnInit } from '@angular/core';
import { ITopic } from 'src/app/models/topic.model';
import { Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TopicsState } from 'src/app/ngxs/states/topics.state';
import { GetTopicByID } from 'src/app/ngxs/actions/topics.actions';
import { MatDialog } from '@angular/material';
import { CreateTopicModalComponent } from 'src/app/components/create-topic-modal/create-topic-modal.component';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {
  shown = {
    subscribed: true,
    all: true
  }
  
  @Select(TopicsState.getTopics)
  allTopics: Observable<ITopic[]>

  @Select(TopicsState.getSubbedTopics)
  subbedTopics: Observable<ITopic[]>

  constructor(private router: Router, private store: Store, public dialog: MatDialog) { }

  ngOnInit() {
  }

  //TODO: TEST ONCE TOPICS ADDED
  openTopic(t: ITopic) {
    this.router.navigate([`/topics/${t.ID}`])
    this.store.dispatch(new GetTopicByID(t.ID))
  }

  toggleHidden(n: number) {
    switch(n)
    {
      case 0:
        this.shown.subscribed = !this.shown.subscribed
        break;
      case 1:
        this.shown.all = !this.shown.all
        break;
    }
  }

  openCreateTopic() {
    this.dialog.open(CreateTopicModalComponent)
  }
}
