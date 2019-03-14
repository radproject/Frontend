import { Component, OnInit } from '@angular/core';
import { ITopic } from 'src/app/models/topic.model';
import { Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TopicsState } from 'src/app/ngxs/states/topics.state';

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

  constructor(private router: Router, private store: Store) { }

  ngOnInit() {
  }

  //TODO: TEST ONCE TOPICS ADDED
  openTopic(t: ITopic) {
    this.router.navigate([`/topics/${t.ID}`])
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
}
