import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrfSecurityInvestmentSaleComponent } from './grf-security-investment-sale.component';

describe('GrfSecurityInvestmentSaleComponent', () => {
  let component: GrfSecurityInvestmentSaleComponent;
  let fixture: ComponentFixture<GrfSecurityInvestmentSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrfSecurityInvestmentSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrfSecurityInvestmentSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
