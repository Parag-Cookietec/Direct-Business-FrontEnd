import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteWiseLoanLiabilityComponent } from './institution-wise-loan-liability.component';

describe('RepaymentLiabilityComponent', () => {
  let component: InstituteWiseLoanLiabilityComponent;
  let fixture: ComponentFixture<InstituteWiseLoanLiabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstituteWiseLoanLiabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteWiseLoanLiabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
