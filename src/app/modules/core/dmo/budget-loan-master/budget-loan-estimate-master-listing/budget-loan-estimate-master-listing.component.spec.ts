import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetLoanEstimateMasterListingComponent } from './budget-loan-estimate-master-listing.component';

describe('BudgetLoanEstimateMasterListingComponent', () => {
  let component: BudgetLoanEstimateMasterListingComponent;
  let fixture: ComponentFixture<BudgetLoanEstimateMasterListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetLoanEstimateMasterListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetLoanEstimateMasterListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
