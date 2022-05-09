import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetLoanEstimateMasterComponent } from './budget-loan-estimate-master.component';

describe('BudgetLoanEstimateMasterComponent', () => {
  let component: BudgetLoanEstimateMasterComponent;
  let fixture: ComponentFixture<BudgetLoanEstimateMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetLoanEstimateMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetLoanEstimateMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
