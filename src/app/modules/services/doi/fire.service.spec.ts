/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FireService } from './fire.service';

describe('Service: Fire', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FireService]
    });
  });

  it('should ...', inject([FireService], (service: FireService) => {
    expect(service).toBeTruthy();
  }));
});
