import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanoutstandingYearWiseComponent } from './loan-outstanding-year-wise.component';

describe('LoanoutstandingYearWiseComponent', () => {
  let component: LoanoutstandingYearWiseComponent;
  let fixture: ComponentFixture<LoanoutstandingYearWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanoutstandingYearWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanoutstandingYearWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
