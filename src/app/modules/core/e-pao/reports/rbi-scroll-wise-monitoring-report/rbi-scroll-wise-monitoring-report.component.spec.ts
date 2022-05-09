import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RbiScrollWiseMonitoringReportComponent } from './rbi-scroll-wise-monitoring-report.component';

describe('RbiScrollWiseMonitoringReportComponent', () => {
  let component: RbiScrollWiseMonitoringReportComponent;
  let fixture: ComponentFixture<RbiScrollWiseMonitoringReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RbiScrollWiseMonitoringReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RbiScrollWiseMonitoringReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
