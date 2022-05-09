import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidatedSummaryReceiptReportComponent } from './consolidated-summary-receipt-report.component';

describe('ConsolidatedSummaryReceiptReportComponent', () => {
  let component: ConsolidatedSummaryReceiptReportComponent;
  let fixture: ComponentFixture<ConsolidatedSummaryReceiptReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidatedSummaryReceiptReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidatedSummaryReceiptReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
