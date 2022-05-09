import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspenseAccMonitoringReportComponent } from './suspense-acc-monitoring-report.component';

describe('SuspenseAccMonitoringReportComponent', () => {
  let component: SuspenseAccMonitoringReportComponent;
  let fixture: ComponentFixture<SuspenseAccMonitoringReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspenseAccMonitoringReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspenseAccMonitoringReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
