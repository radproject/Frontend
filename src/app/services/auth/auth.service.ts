import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  login(email: string, password: string): Observable<IUser> {
    // let body = {
    //   username: email,
    //   password: password,
    //   grant_type: 'password'
    // }

    let body = new URLSearchParams()
    body.set('username', email)
    body.set('password', password)
    body.set('grant_type', 'password')

    this._http.post(`${environment.webApiURL}/login`, body.toString(), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    })
  }

  register(username: string, password: string, confirmPassword: string): Observable<any> {
    alert(`username ${username} password: ${password} confirm: ${confirmPassword}`)
    return this._http.post(`${environment.webApiUrl}/account/Register`, JSON.stringify({
      Email: username,
      Password: password,
      ConfirmPassword: confirmPassword
    }), {
        headers: {
          "Content-Type": "application/json"
        }
      })
  }
}
