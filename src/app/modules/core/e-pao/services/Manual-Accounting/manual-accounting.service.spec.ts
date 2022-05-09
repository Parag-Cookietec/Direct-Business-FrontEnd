import { TestBed } from '@angular/core/testing';

import { ManualAccountingService } from './manual-accounting.service';

describe('ManualAccountingService', () => {
  let service: ManualAccountingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManualAccountingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
