import { Component, OnInit, Input } from '@angular/core';
import { ITopic } from 'src/app/models/topic.model';

@Component({
  selector: 'topic-list-item',
  templateUrl: './topic-list-item.component.html',
  styleUrls: ['./topic-list-item.component.scss']
})
export class TopicListItemComponent implements OnInit {
  @Input('TopicIn') topic: ITopic

  constructor() { }

  ngOnInit() {
  }

}
