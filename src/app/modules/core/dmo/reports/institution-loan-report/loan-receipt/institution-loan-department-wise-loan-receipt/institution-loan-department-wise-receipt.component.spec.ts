import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionLoanDepartmentWiseReceiptComponent } from './institution-loan-department-wise-receipt.component';

describe('InstitutionLoanDepartmentWiseReceiptComponent', () => {
  let component: InstitutionLoanDepartmentWiseReceiptComponent;
  let fixture: ComponentFixture<InstitutionLoanDepartmentWiseReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionLoanDepartmentWiseReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionLoanDepartmentWiseReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
