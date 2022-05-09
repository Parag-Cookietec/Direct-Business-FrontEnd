import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyPaymentScreenComponent } from './policy-payment-screen.component';

describe('PolicyPaymentScreenComponent', () => {
  let component: PolicyPaymentScreenComponent;
  let fixture: ComponentFixture<PolicyPaymentScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyPaymentScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyPaymentScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
