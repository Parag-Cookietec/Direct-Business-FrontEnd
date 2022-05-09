import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateWiseCinDataReportComponent } from './date-wise-cin-data-report.component';

describe('DateWiseCinDataReportComponent', () => {
  let component: DateWiseCinDataReportComponent;
  let fixture: ComponentFixture<DateWiseCinDataReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateWiseCinDataReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateWiseCinDataReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
