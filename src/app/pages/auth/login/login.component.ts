import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

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

  constructor(private router: Router, private auth: AuthService, private notification: NotificationService) { }

  ngOnInit() { }

  goToRegister() { this.router.navigate(['/auth/register']) }

  tryLogin() {
    this.auth.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((res) => {
      console.log(res)
      this.notification.info('Successful Login', "You logged in succesfully!")
      this.router.navigate(['home'])
    }, err => {
      this.notification.danger('Failed to login', err)
    })
    // this.auth.emailLogin(this.loginForm.value.email, this.loginForm.value.password).catch(err => { this.notification.danger('Failed to login',err)})
  }
}
