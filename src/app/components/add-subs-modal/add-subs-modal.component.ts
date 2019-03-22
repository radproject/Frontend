import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/user.model';
import { ITopic } from 'src/app/models/topic.model';

@Component({
  selector: 'app-add-subs-modal',
  templateUrl: './add-subs-modal.component.html',
  styleUrls: ['./add-subs-modal.component.scss']
})
export class AddSubsModalComponent implements OnInit {
  subsAdded:IUser[] = [];
  results$: Observable<IUser[]>
  
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

  ngOnInit() { }

  searchForUser() {
    this.results$ = this.auth.searchUsers(this.userSearchForm.value.name)
  }

  addSub(u: IUser) {
    if(this.subsAdded.includes(u))
    {
      this.subsAdded.splice((this.subsAdded.findIndex(s => s.Id == u.Id)),1)
    }
    else
    {
      this.subsAdded.push(u)
    }
  }
}
