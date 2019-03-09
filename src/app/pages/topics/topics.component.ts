import { Component, OnInit } from '@angular/core';
import { ITopic } from 'src/app/models/topic.model';
import { Select, Store } from '@ngxs/store';
import { TopicsState } from 'src/app/ngxs/states/topics.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {
  
  @Select(TopicsState.getSelectedTopic)
  selectedTopic: ITopic

  constructor(private store: Store, private router: Router) { }

  ngOnInit() { }

  returnToIndex() {
    this.router.navigate(['/topics/browse'])
  }

}
