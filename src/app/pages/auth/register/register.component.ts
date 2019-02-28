import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
    = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required])
  }, {
    validators: this.passwordsMatch('password', 'confirmPassword')
  })

  passwordsMatch(p1: string, p2: string) {
    return (group: FormGroup): { [key: string]: any } => {
      if (
        (group.controls[p1].value == null)
        ||
        (group.controls[p2].value == null)
        ||
        (group.controls[p1].value == group.controls[p2].value)
      )
      { return {} }
      else
      { return { passMatch: 'Passwords must match' } }
    }
  }
  constructor(private router: Router, private auth: AuthService, private notification: NotificationService) { }

  ngOnInit() { }

  register() {
    // this.auth.register(  VALUES  )
      // .catch(err => {
        // this.notification.danger('Failed to register', err)
      // })
  }

  goToLogin() { this.router.navigate(['/auth/login']) }
}
