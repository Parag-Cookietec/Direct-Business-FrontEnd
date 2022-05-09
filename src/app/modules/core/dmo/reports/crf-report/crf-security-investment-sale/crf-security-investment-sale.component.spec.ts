import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CRfSecurityInvestmentSaleComponent } from './crf-security-investment-sale.component';

describe('CRfSecurityInvestmentSaleComponent', () => {
  let component: CRfSecurityInvestmentSaleComponent;
  let fixture: ComponentFixture<CRfSecurityInvestmentSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CRfSecurityInvestmentSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CRfSecurityInvestmentSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
