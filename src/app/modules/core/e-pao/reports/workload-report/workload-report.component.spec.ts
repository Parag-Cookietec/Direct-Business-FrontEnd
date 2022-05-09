import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkloadReportComponent } from './workload-report.component';

describe('WorkloadReportComponent', () => {
  let component: WorkloadReportComponent;
  let fixture: ComponentFixture<WorkloadReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkloadReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkloadReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
