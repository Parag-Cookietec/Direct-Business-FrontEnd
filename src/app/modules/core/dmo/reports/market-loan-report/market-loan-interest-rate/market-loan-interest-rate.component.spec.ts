import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketLoanInterestRateComponent } from './market-loan-interest-rate.component';

describe('MarketLoanInterestRateComponent', () => {
  let component: MarketLoanInterestRateComponent;
  let fixture: ComponentFixture<MarketLoanInterestRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketLoanInterestRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketLoanInterestRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
