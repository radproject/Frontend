import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this._http.post(`${environment.webApiUrl}/Login`, {
      grant_type: 'password',
      username,
      password
    }, {
        headers: {
          "Content-Type": "x-www-form-urlencoded"
        }
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