import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryPenalInterestReportComponent } from './summary-penal-interest-report.component';

describe('SummaryPenalInterestReportComponent', () => {
  let component: SummaryPenalInterestReportComponent;
  let fixture: ComponentFixture<SummaryPenalInterestReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryPenalInterestReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryPenalInterestReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
