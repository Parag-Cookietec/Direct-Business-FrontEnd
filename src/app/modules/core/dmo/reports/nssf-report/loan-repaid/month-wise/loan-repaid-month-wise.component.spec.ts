import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRepaidMonthWiseComponent } from './loan-repaid-month-wise.component';

describe('LoanRepaidMonthWiseComponent', () => {
  let component: LoanRepaidMonthWiseComponent;
  let fixture: ComponentFixture<LoanRepaidMonthWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanRepaidMonthWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanRepaidMonthWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
