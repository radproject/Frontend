import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserState } from 'src/app/ngxs/states/user.state';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/user.model';
import { Select, Store } from '@ngxs/store';
import { CreateTopic } from 'src/app/ngxs/actions/topics.actions';
import { ITopic } from 'src/app/models/topic.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-topic-modal',
  templateUrl: './create-topic-modal.component.html',
  styleUrls: ['./create-topic-modal.component.scss']
})
export class CreateTopicModalComponent implements OnInit {

  topicForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    private: new FormControl(false, [Validators.required])
  })

  @Select(UserState.getUser)
  user$: Observable<IUser>

  constructor(
    public dialogRef: MatDialogRef<CreateTopicModalComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA)
    public data,
    ) { }

  ngOnInit() {
  }

  createTopic() {
    this.user$.subscribe(u => {
      if(u)
      {
        let newTopic: Partial<ITopic> = {
          Title: this.topicForm.value.name,
          CreationDate: new Date(),
          Creator: u,
          isPrivate: this.topicForm.value.private
        }
        this.store.dispatch(new CreateTopic(newTopic))
        this.dialogRef.close()
      }
    })
  }
}
