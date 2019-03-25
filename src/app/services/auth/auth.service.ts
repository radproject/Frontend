import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import { Observable, of } from 'rxjs';
import { Store } from '@ngxs/store';
import { GetUser } from 'src/app/ngxs/actions/user.actions';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user.model';
import { HttpResponse } from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient, private store: Store, private router: Router) { }

  //POST: Login with provided credentials
  login(email: string, password: string) {
    //Set body to credentials
    let body = new URLSearchParams()
    body.set('username', email)
    body.set('password', password)
    body.set('grant_type', 'password')

    //Return token
    return this._http.post(`${environment.webApiURL}/login`, body.toString(), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    })
  }

  //POST: Register with provided credentials
  register(username: string, password: string, confirmPassword: string, studentnumber: string, name: string): Observable<any> {
    return this._http.post(`${environment.webApiURL}/account/Register`, JSON.stringify({
      Email: username,
      Password: password,
      ConfirmPassword: confirmPassword,
      StudentNumber: studentnumber,
      FullName: name
    }), {
        headers: {
          "Content-Type": "application/json"
        }
      })
  }

  getUser() {
    return this._http.get<IUser>(`${environment.webApiURL}/account/getaccount`)
  }

  searchUsers(name: string) {
    return this._http.get<IUser[]>(`${environment.webApiURL}/account/getusers?searchParam=${name}`)
  }

  logout() {
    return this._http.post(`${environment.webApiURL}/account/logout`, {})
  }
}
