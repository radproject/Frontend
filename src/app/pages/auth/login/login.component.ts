import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { GetUser } from 'src/app/ngxs/actions/user.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
    = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    })

  constructor(private router: Router, private auth: AuthService, private notification: NotificationService, private store: Store) { }

  ngOnInit() { }

  goToRegister() { this.router.navigate(['/auth/register']) }

  tryLogin() {
    this.auth.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((res: {access_token: string, id_token: string}) => {
      console.log(res)
      localStorage.setItem('access_token', res.access_token)
      localStorage.setItem('id_token', res.id_token)
      localStorage.setItem('expiry', res['.expiry'])
      this.notification.info('Successful Login', "You logged in succesfully!")
      this.router.navigate(['home'])
      this.store.dispatch(new GetUser())
    }, err => {0
      this.notification.danger('Failed to login', err.error.error_description)
    })
  }
}
