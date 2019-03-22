import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubsModalComponent } from './add-subs-modal.component';

describe('AddSubsModalComponent', () => {
  let component: AddSubsModalComponent;
  let fixture: ComponentFixture<AddSubsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
