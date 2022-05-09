import { TestBed } from '@angular/core/testing';

import { ScrollDistributionService } from './scroll-distribution.service';

describe('ScrollDistributionService', () => {
  let service: ScrollDistributionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollDistributionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
