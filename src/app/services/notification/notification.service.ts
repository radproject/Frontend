import { Injectable } from '@angular/core';
import { ToasterConfig, ToasterService } from 'angular2-toaster';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  config: ToasterConfig = new ToasterConfig({
    limit: 5,
    tapToDismiss: true,
    mouseoverTimerStop: true,
    showCloseButton: true,
    newestOnTop: true,
    timeout: 3000,
    positionClass: 'toast-bottom-center'
  })

  constructor(private toaster: ToasterService) { }

  success(title: string, body: string) {
    this.toaster.pop('success',title,body)
  }
  
  info(title: string, body: string) {
    this.toaster.pop('info',title,body)
  }
  
  warning(title: string, body: string) {
    this.toaster.pop('warning',title,body)
  }
  
  danger(title: string, body: string) {
    this.toaster.pop('error',title,body)
  }
  
  clear() {
    this.toaster.clear()
  }
}
