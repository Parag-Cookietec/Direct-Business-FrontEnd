import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EPAOCommonWorkflowComponent } from './epao-common-workflow.component';

describe('EPAOCommonWorkflowComponent', () => {
  let component: EPAOCommonWorkflowComponent;
  let fixture: ComponentFixture<EPAOCommonWorkflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EPAOCommonWorkflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EPAOCommonWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
