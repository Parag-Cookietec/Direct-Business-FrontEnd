import { TestBed } from '@angular/core/testing';

import { MarketLoanReportsService } from './market-loan-reports.service';

describe('MarketLoanReportsService', () => {
  let service: MarketLoanReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketLoanReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
