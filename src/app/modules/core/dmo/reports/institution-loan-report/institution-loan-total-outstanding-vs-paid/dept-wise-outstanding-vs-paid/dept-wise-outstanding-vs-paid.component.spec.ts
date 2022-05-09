import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptWiseOutstandingVsPaid } from './dept-wise-outstanding-vs-paid.component';

describe('InstitutionAccLoanLiability', () => {
  let component: DeptWiseOutstandingVsPaid;
  let fixture: ComponentFixture<DeptWiseOutstandingVsPaid>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeptWiseOutstandingVsPaid ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptWiseOutstandingVsPaid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
