import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyProposalLetterComponent } from './policy-proposal-letter.component';

describe('PolicyProposalLetterComponent', () => {
  let component: PolicyProposalLetterComponent;
  let fixture: ComponentFixture<PolicyProposalLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyProposalLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyProposalLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
