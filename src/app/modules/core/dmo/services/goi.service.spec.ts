import { TestBed } from '@angular/core/testing';

import { GoiService } from './goi.service';

describe('GoiService', () => {
  let service: GoiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
