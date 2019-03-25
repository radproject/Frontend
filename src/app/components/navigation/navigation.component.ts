import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user.model';
import { Select } from '@ngxs/store';
import { UserState } from 'src/app/ngxs/states/user.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @Select(UserState.getUser)
  user$: Observable<IUser>

  constructor(
    public router: Router,
    private auth: AuthService,
    private notification: NotificationService) { }

  ngOnInit() {
  }

  selectPage(route: string) {
    this.router.navigate([route])
  }

  logout() {
    this.auth.logout().subscribe(res => {
      localStorage.removeItem('access_token')
      localStorage.removeItem('expiry')
      this.router.navigate(['home'])
    })
  }
}
