import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyInTransitProposalComponent } from './money-in-transit-proposal.component';

describe('MoneyInTransitProposalComponent', () => {
  let component: MoneyInTransitProposalComponent;
  let fixture: ComponentFixture<MoneyInTransitProposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyInTransitProposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyInTransitProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
