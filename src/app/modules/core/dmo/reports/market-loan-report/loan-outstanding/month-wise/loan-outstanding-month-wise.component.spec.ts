import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanoutstandingMonthWiseComponent } from './loan-outstanding-month-wise.component';

describe('LoanoutstandingMonthWiseComponent', () => {
  let component: LoanoutstandingMonthWiseComponent;
  let fixture: ComponentFixture<LoanoutstandingMonthWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanoutstandingMonthWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanoutstandingMonthWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
