import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidatedPaymentReportExpandedComponent } from './consolidated-payment-report-expanded.component';

describe('ConsolidatedPaymentReportExpandedComponent', () => {
  let component: ConsolidatedPaymentReportExpandedComponent;
  let fixture: ComponentFixture<ConsolidatedPaymentReportExpandedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidatedPaymentReportExpandedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidatedPaymentReportExpandedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
