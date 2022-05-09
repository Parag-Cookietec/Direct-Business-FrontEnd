import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimEntryListingSendForPaymentComponent } from './claim-entry-listing-send-for-payment.component';

describe('ClaimEntryListingSendForPaymentComponent', () => {
  let component: ClaimEntryListingSendForPaymentComponent;
  let fixture: ComponentFixture<ClaimEntryListingSendForPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimEntryListingSendForPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimEntryListingSendForPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
