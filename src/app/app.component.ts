import { Component } from '@angular/core';
import { NotificationService } from './services/notification/notification.service';
import { Store } from '@ngxs/store';
import { GetUser } from './ngxs/actions/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public notification: NotificationService, private _store: Store) {
    let access_token = localStorage.getItem('access_token')
    let expiry = localStorage.getItem('expiry')

    if (access_token && expiry) {
      let convertedExpiry = new Date(expiry)

      if (convertedExpiry > new Date()) {
        this._store.dispatch(new GetUser())
      }
    }
  }
}
