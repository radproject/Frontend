import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { GetAllTopics } from './ngxs/actions/topics.actions';
import { UserState } from './ngxs/states/user.state';
import { Observable } from 'rxjs';
import { IUser } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Select(UserState.getUser)
  user$: Observable<IUser>
  
  constructor(private store: Store) {
    this.user$.subscribe(res => {
      this.store.dispatch(new GetAllTopics(res.StudentId))
    }).unsubscribe()
  }
}
