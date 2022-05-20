/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MoneyService } from './money.service';

describe('Service: Money', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoneyService]
    });
  });

  it('should ...', inject([MoneyService], (service: MoneyService) => {
    expect(service).toBeTruthy();
  }));
});
