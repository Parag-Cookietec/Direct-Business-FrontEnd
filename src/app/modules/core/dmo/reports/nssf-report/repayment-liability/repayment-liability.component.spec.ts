import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepaymentLiabilityComponent } from './repayment-liability.component';

describe('RepaymentLiabilityComponent', () => {
  let component: RepaymentLiabilityComponent;
  let fixture: ComponentFixture<RepaymentLiabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepaymentLiabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepaymentLiabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
