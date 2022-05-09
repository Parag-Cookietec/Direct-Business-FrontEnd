import { TestBed } from '@angular/core/testing';

import { ChallanAccountingService } from './challan-accounting.service';

describe('ChallanAccountingService', () => {
  let service: ChallanAccountingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChallanAccountingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
