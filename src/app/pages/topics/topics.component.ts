import { Component, OnInit } from '@angular/core';
import { ITopic } from 'src/app/models/topic.model';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {
  selectedTopic: ITopic

  constructor() { }

  ngOnInit() { }

}
