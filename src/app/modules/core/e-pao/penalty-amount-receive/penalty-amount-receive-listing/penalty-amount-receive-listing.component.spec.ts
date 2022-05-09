import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenaltyAmountReceiveListingComponent } from './penalty-amount-receive-listing.component';

describe('PenaltyAmountReceiveListingComponent', () => {
  let component: PenaltyAmountReceiveListingComponent;
  let fixture: ComponentFixture<PenaltyAmountReceiveListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenaltyAmountReceiveListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenaltyAmountReceiveListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
