import { TestBed } from '@angular/core/testing';

import { ChallanDistributionService } from './challan-distribution.service';

describe('ChallanDistributionService', () => {
  let service: ChallanDistributionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChallanDistributionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
