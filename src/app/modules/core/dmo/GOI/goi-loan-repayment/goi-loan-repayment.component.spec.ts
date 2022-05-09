import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoiLoanRepaymentComponent } from './goi-loan-repayment.component';

describe('GoiLoanRepaymentComponent', () => {
  let component: GoiLoanRepaymentComponent;
  let fixture: ComponentFixture<GoiLoanRepaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoiLoanRepaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoiLoanRepaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
