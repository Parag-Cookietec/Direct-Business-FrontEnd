/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AviationService } from './aviation.service';

describe('Service: Aviation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AviationService]
    });
  });

  it('should ...', inject([AviationService], (service: AviationService) => {
    expect(service).toBeTruthy();
  }));
});
