/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PartyMasterService } from './party-master.service';

describe('Service: PartyMaster', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartyMasterService]
    });
  });

  it('should ...', inject([PartyMasterService], (service: PartyMasterService) => {
    expect(service).toBeTruthy();
  }));
});
