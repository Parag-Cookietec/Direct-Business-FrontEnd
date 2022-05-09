import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionAccLoanLiability } from './institution-acc-loan-liability.component';

describe('InstitutionAccLoanLiability', () => {
  let component: InstitutionAccLoanLiability;
  let fixture: ComponentFixture<InstitutionAccLoanLiability>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionAccLoanLiability ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionAccLoanLiability);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
