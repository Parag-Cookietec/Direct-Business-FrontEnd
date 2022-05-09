import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { institutionLoanoutstandingvspaid } from './institution-loan-total-outstanding-vs-paid.component';

describe('institutionLoanoutstandingvspaid', () => {
  let component: institutionLoanoutstandingvspaid;
  let fixture: ComponentFixture<institutionLoanoutstandingvspaid>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ institutionLoanoutstandingvspaid ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(institutionLoanoutstandingvspaid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
