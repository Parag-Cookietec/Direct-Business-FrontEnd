import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidatedPaymentReportSummaryComponent } from './consolidated-payment-report-summary.component';

describe('ConsolidatedPaymentReportSummaryComponent', () => {
  let component: ConsolidatedPaymentReportSummaryComponent;
  let fixture: ComponentFixture<ConsolidatedPaymentReportSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidatedPaymentReportSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidatedPaymentReportSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
