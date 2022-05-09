import { TestBed } from '@angular/core/testing';

import { CrfgrfReportsService } from './crfgrf-reports.service';

describe('CrfgrfReportsService', () => {
  let service: CrfgrfReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrfgrfReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
