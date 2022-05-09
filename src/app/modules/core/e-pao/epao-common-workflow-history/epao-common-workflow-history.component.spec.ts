import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpaoCommonWorkflowHistoryComponent } from './epao-common-workflow-history.component';

describe('EpaoCommonWorkflowHistoryComponent', () => {
  let component: EpaoCommonWorkflowHistoryComponent;
  let fixture: ComponentFixture<EpaoCommonWorkflowHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpaoCommonWorkflowHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpaoCommonWorkflowHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
