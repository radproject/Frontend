import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlShortenerModalComponent } from './url-shortener-modal.component';

describe('UrlShortenerModalComponent', () => {
  let component: UrlShortenerModalComponent;
  let fixture: ComponentFixture<UrlShortenerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlShortenerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlShortenerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
