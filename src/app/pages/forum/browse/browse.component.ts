import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {
  departments = [
    {
      name: 'School of Science',
      topics: [
        "Topic 1",
        "Topic 2",
        "Topic 3",
        "Topic 4",
        "Topic 5"
      ]
    },
    {
      name: 'School of Engineering & Design',
      topics: [
        "Topic 1",
        "Topic 2",
        "Topic 3",
        "Topic 4",
        "Topic 5"
      ]
    },
    {
      name: 'College Managment',
      topics: [
        "Topic 1",
        "Topic 2",
        "Topic 3",
        "Topic 4",
        "Topic 5"
      ]
    },
    {
      name: 'Students Union',
      topics: [
        "Topic 1",
        "Topic 2",
        "Topic 3",
        "Topic 4",
        "Topic 5"
      ]
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
