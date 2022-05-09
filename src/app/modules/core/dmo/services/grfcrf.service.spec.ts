import { TestBed } from '@angular/core/testing';

import { GrfcrfService } from './grfcrf.service';

describe('GrfcrfService', () => {
  let service: GrfcrfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrfcrfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
