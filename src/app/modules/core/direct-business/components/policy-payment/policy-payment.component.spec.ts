import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyPaymentComponent } from './policy-payment.component';

describe('PolicyPaymentComponent', () => {
  let component: PolicyPaymentComponent;
  let fixture: ComponentFixture<PolicyPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
