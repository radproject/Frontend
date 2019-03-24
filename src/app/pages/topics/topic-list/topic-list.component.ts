import { Component, OnInit } from '@angular/core';
import { ITopic } from 'src/app/models/topic.model';
import { Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TopicsState } from 'src/app/ngxs/states/topics.state';
import { GetTopicByID, SearchForTopic, GetSubscribedTopics, GetAllTopics } from 'src/app/ngxs/actions/topics.actions';
import { MatDialog } from '@angular/material';
import { CreateTopicModalComponent } from 'src/app/components/create-topic-modal/create-topic-modal.component';
import { UserState } from 'src/app/ngxs/states/user.state';
import { IUser } from 'src/app/models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  
  searchForm: FormGroup
    = new FormGroup({
      searchTerm: new FormControl(null, [Validators.required])
    })
  
  @Select(TopicsState.getTopics)
  allTopics: Observable<ITopic[]>
  topics: ITopic[]

  @Select(TopicsState.getSubbedTopics)
  subbedTopics: Observable<ITopic[]>

  @Select(UserState.getUser)
  user$: Observable<IUser>

  constructor(private router: Router, private store: Store, public dialog: MatDialog) { }

  ngOnInit() {
    this.store.dispatch(new GetAllTopics())
  }

  openTopic(t: ITopic) {
    this.router.navigate([`/topics/${t.Id}`])
    this.store.dispatch(new GetTopicByID(t.Id))
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

  search() {
    this.store.dispatch(new SearchForTopic(this.searchForm.value.searchTerm))
  }
}
