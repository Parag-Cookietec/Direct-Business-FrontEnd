import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceMonitoringReportComponent } from './performance-monitoring-report.component';

describe('PerformanceMonitoringReportComponent', () => {
  let component: PerformanceMonitoringReportComponent;
  let fixture: ComponentFixture<PerformanceMonitoringReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanceMonitoringReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceMonitoringReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
