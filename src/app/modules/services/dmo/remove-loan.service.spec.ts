import { TestBed } from '@angular/core/testing';

import { RemoveLoanService } from './remove-loan.service';

describe('RemoveLoanService', () => {
  let service: RemoveLoanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoveLoanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
