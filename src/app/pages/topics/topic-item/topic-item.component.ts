import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { ClearSelectedTopic } from 'src/app/ngxs/actions/topics.actions';

@Component({
  selector: 'app-topic-item',
  templateUrl: './topic-item.component.html',
  styleUrls: ['./topic-item.component.scss']
})
export class TopicItemComponent implements OnInit, OnDestroy {

  constructor(private store: Store) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.store.dispatch(new ClearSelectedTopic())
  }

}
