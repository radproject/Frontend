import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AddSubsModalComponent } from '../add-subs-modal/add-subs-modal.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RebrandlyService } from 'src/app/services/rebrandly/rebrandly.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-url-shortener-modal',
  templateUrl: './url-shortener-modal.component.html',
  styleUrls: ['./url-shortener-modal.component.scss']
})
export class UrlShortenerModalComponent implements OnInit {
  shortUrl: string = '';

  urlShortenForm: FormGroup
    = new FormGroup({
      longUrl: new FormControl(null, [Validators.required])
    })

  constructor(
    public dialogRef: MatDialogRef<AddSubsModalComponent>,
    private rebrandly: RebrandlyService,
    private notification: NotificationService
  ) { }

  ngOnInit() {
  }

  shorten() {
    this.rebrandly.createLink(this.urlShortenForm.value.longUrl)
    .subscribe(
      res => {
        if(res) {
          let response = res as IURLShortened
          this.shortUrl = response.shortUrl
        }
      },
      err => {
        console.warn(err)
        this.notification.danger('Failed to shorten URL', err)
      }
    );
  }

}

interface IURLShortened {
  id?: string
  title?: string
  slashtag?: string
  destination?: string
  createdAt?: Date
  updatedAt?: Date
  shortUrl?: string
  domain?: {
    id?: string
    fullName?: string
  }
}
