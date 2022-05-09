/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DoiCommonService } from './doi-common.service';

describe('Service: DoiCommon', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoiCommonService]
    });
  });

  it('should ...', inject([DoiCommonService], (service: DoiCommonService) => {
    expect(service).toBeTruthy();
  }));
});
