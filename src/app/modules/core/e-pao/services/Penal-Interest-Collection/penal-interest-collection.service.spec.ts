import { TestBed } from '@angular/core/testing';

import { PenalInterestCollectionService } from './penal-interest-collection.service';

describe('PenalInterestCollectionService', () => {
  let service: PenalInterestCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PenalInterestCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
