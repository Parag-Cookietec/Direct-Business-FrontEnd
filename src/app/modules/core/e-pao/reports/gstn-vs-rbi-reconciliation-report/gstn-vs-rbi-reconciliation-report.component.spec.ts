import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GstnVsRbiReconciliationReportComponent } from './gstn-vs-rbi-reconciliation-report.component';

describe('GstnVsRbiReconciliationReportComponent', () => {
  let component: GstnVsRbiReconciliationReportComponent;
  let fixture: ComponentFixture<GstnVsRbiReconciliationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GstnVsRbiReconciliationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GstnVsRbiReconciliationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
