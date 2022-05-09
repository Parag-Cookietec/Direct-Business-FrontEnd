import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyProposalOfferComponent } from './policy-proposal-offer.component';

describe('PolicyProposalOfferComponent', () => {
  let component: PolicyProposalOfferComponent;
  let fixture: ComponentFixture<PolicyProposalOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyProposalOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyProposalOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
