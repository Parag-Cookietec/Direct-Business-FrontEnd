import { TestBed } from '@angular/core/testing';

import { GoiLoanReportsService } from './goi-loan-reports.service';

describe('GoiLoanReportsService', () => {
  let service: GoiLoanReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoiLoanReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
