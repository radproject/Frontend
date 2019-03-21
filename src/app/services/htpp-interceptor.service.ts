import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Interceptor implements HttpInterceptor {
  intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
    if(localStorage.getItem('access_token') !== undefined && localStorage.getItem('access_token') !== null) {
      let at = localStorage.getItem('access_token').toString()
      const updatedRequest = req.clone({
        headers: req.headers.append('authorization', `Bearer ${at}`)
      })

      return next.handle(updatedRequest)
    }

    return next.handle(req)
  }

  constructor() { }
}
