import { TestBed } from '@angular/core/testing';

import { GstFileAccountingService } from './gst-file-accounting.service';

describe('GstFileAccountingService', () => {
  let service: GstFileAccountingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GstFileAccountingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
