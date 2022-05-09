import { TestBed } from '@angular/core/testing';

import { EpaoCommonWorkflowService } from './epao-common-workflow.service';

describe('EpaoCommonWorkflowService', () => {
  let service: EpaoCommonWorkflowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpaoCommonWorkflowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
