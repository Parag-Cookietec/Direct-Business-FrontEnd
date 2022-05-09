import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeTranchewiseDetailsofLoanOutstandingComponent } from './Scheme-Tranche-wise-Details-of-Loan-Outstanding.component';

describe('SchemeTranchewiseDetailsofLoanOutstandingComponent', () => {
  let component: SchemeTranchewiseDetailsofLoanOutstandingComponent;
  let fixture: ComponentFixture<SchemeTranchewiseDetailsofLoanOutstandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemeTranchewiseDetailsofLoanOutstandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeTranchewiseDetailsofLoanOutstandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
