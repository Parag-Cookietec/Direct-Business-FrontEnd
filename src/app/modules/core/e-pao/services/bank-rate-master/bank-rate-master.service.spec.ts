import { TestBed } from '@angular/core/testing';

import { BankRateMasterService } from './bank-rate-master.service';

describe('BankRateMasterService', () => {
  let service: BankRateMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankRateMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
