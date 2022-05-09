import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaiationProposalComponent } from './avaiation-proposal.component';

describe('AvaiationProposalComponent', () => {
  let component: AvaiationProposalComponent;
  let fixture: ComponentFixture<AvaiationProposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvaiationProposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaiationProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
