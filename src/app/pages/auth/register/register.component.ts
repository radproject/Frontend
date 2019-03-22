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
      studentnumber: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required])
    }, {
        validators: this.passwordsMatch('password', 'confirmPassword')
      })

  backendErrors = {
    email: null,
    password: null,
    confirmPassword: null,
    studentnumber: null
  }

  passwordsMatch(p1: string, p2: string) {
    return (group: FormGroup): { [key: string]: any } => {
      if (
        (group.controls[p1].value == null)
        ||
        (group.controls[p2].value == null)
        ||
        (group.controls[p1].value == group.controls[p2].value)
      ) { return {} }
      else { return { passMatch: 'Passwords must match' } }
    }
  }
  constructor(private router: Router, private auth: AuthService, private notification: NotificationService) { }

  ngOnInit() { }

  register() {
    this.auth.register(this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.confirmPassword, this.registerForm.value.studentnumber).subscribe(res => {
      this.notification.success("Registration Complete", `${this.registerForm.value.name}, You registered Successfully!`)
      this.router.navigate(['/auth/login'])
    }, err => {
      let messages = err.error.ModelState
      this.backendErrors = {
        email: null,
        password: null,
        confirmPassword: null,
        studentnumber: null
      }
      console.log(err)
      if(err.error['Message']) {
        this.backendErrors.email = (err.error['Message'])
      }
      if(messages['model.Password'] != undefined) {
        this.backendErrors.password = (messages['model.Password'] as String[]).join(',')
      }
      if(messages['model.ConfirmPassword'] != undefined) {
        this.backendErrors.password = `${this.backendErrors},${(messages['model.ConfirmPassword'] as String[]).join(',') }` }
      if(messages['model.StudentNumber'] != undefined)
      { this.backendErrors.studentnumber = (messages['model.StudentNumber'] as String[]).join(',') }

    })
  }

  goToLogin() { this.router.navigate(['/auth/login']) }
}
