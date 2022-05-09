import { TestBed } from '@angular/core/testing';

import { ChallanDistService } from './challan-dist.service';

describe('ChallanDistService', () => {
  let service: ChallanDistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChallanDistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
