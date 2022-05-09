import { TestBed } from '@angular/core/testing';

import { NssfReportsService } from './nssf-reports.service';

describe('NssfReportsService', () => {
  let service: NssfReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NssfReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
