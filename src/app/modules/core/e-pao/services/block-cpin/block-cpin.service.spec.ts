import { TestBed } from '@angular/core/testing';

import { BlockCpinService } from './block-cpin.service';

describe('BlockCpinService', () => {
  let service: BlockCpinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockCpinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
