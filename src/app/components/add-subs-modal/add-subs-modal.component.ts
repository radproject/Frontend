import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/user.model';
import { ITopic } from 'src/app/models/topic.model';
import { SubscribeToTopic, UnsubscribeFromTopic } from 'src/app/ngxs/actions/topics.actions';

@Component({
  selector: 'app-add-subs-modal',
  templateUrl: './add-subs-modal.component.html',
  styleUrls: ['./add-subs-modal.component.scss']
})
export class AddSubsModalComponent implements OnInit {
  subsAdded: IUser[] = [];
  results$: Observable<IUser[]>
  topic: ITopic

  userSearchForm: FormGroup
    = new FormGroup({
      name: new FormControl(null, [Validators.required])
    })

  constructor(
    public dialogRef: MatDialogRef<AddSubsModalComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA)
    public data: Observable<ITopic>,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.data.subscribe(res => {
      this.topic = res
    })
  }

  searchForUser() {
    this.results$ = this.auth.searchUsers(this.userSearchForm.value.name)
  }

  addSub(u: IUser) {
    if (this.subsAdded.includes(u)) {
      this.subsAdded.splice((this.subsAdded.findIndex(s => s.Id == u.Id)), 1)
      this.store.dispatch(new UnsubscribeFromTopic(this.topic.Id, u.Id))
    }
    else {
      this.subsAdded.push(u)
      this.store.dispatch(new SubscribeToTopic(this.topic.Id, u.Id))
    }
  }
}
