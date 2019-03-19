import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  //POST: Login with provided credentials
  login(email: string, password: string){
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
  register(username: string, password: string, confirmPassword: string): Observable<any> {
    alert(`username ${username} password: ${password} confirm: ${confirmPassword}`)
    return this._http.post(`${environment.webApiURL}/account/Register`, JSON.stringify({
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
