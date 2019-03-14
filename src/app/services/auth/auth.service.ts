import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  login(email: string, password: string) {
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
    }).subscribe((res: { access_token: string, id_token: string }) => {
      localStorage.setItem('access_token', res.access_token)
      localStorage.setItem('id_token', res.id_token)
  })
  }
}
