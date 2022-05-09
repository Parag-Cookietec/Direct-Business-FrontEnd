import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRepaidYearWiseComponent } from './loan-repaid-year-wise.component';

describe('LoanRepaidYearWiseComponent', () => {
  let component: LoanRepaidYearWiseComponent;
  let fixture: ComponentFixture<LoanRepaidYearWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanRepaidYearWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanRepaidYearWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
