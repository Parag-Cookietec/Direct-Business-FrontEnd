import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFlowEPaoComponent } from './work-flow-e-pao.component';

describe('WorkFlowEPaoComponent', () => {
  let component: WorkFlowEPaoComponent;
  let fixture: ComponentFixture<WorkFlowEPaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkFlowEPaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFlowEPaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
