import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RebrandlyService {

  constructor(private _http: HttpClient) { }

  createLink(url: string) {
    return this._http.get(`https://api.rebrandly.com/v1/links/new?apikey=${environment.rebrandly}&destination=${url}&domain[fullName]=rebrand.ly`)
  }
}
