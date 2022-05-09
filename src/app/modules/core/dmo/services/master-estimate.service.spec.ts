import { TestBed } from '@angular/core/testing';

import { MasterEstimateService } from './master-estimate.service';

describe('MasterEstimateService', () => {
  let service: MasterEstimateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterEstimateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
