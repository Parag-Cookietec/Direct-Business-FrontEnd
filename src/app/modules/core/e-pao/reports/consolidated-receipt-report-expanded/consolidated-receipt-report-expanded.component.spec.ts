import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidatedReceiptReportExpandedComponent } from './consolidated-receipt-report-expanded.component';

describe('ConsolidatedReceiptReportExpandedComponent', () => {
  let component: ConsolidatedReceiptReportExpandedComponent;
  let fixture: ComponentFixture<ConsolidatedReceiptReportExpandedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidatedReceiptReportExpandedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidatedReceiptReportExpandedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
