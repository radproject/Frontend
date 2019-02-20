import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  user: IUser;

  constructor(
    public router: Router,
    private auth: AuthService,
    private notification: NotificationService ) { }

  ngOnInit() {
    // this.auth.user$.subscribe(res => { this.user = res })
  }

  selectPage(route: string) {
    this.router.navigate([route])
  }

  logout() { 
    // this.auth.signOut()
      // .then(res => {this.user = null})
      // .catch(err => { this.notification.danger('Failed to log out',err) })
  }
}
