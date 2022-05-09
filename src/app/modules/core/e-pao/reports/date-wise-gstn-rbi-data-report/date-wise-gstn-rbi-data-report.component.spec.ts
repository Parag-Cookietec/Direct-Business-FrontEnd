import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateWiseGstnRbiDataReportComponent } from './date-wise-gstn-rbi-data-report.component';

describe('DateWiseGstnRbiDataReportComponent', () => {
  let component: DateWiseGstnRbiDataReportComponent;
  let fixture: ComponentFixture<DateWiseGstnRbiDataReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateWiseGstnRbiDataReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateWiseGstnRbiDataReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
