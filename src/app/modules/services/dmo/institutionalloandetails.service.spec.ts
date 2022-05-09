import { TestBed } from '@angular/core/testing';

import { InstitutionalloandetailsService } from './institutionalloandetails.service';

describe('InstitutionalloandetailsService', () => {
  let service: InstitutionalloandetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstitutionalloandetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
