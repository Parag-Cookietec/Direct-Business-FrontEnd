import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrfTotalInvestmentComponent } from './crf-total-investment.component';

describe('CrfTotalInvestmentComponent', () => {
  let component: CrfTotalInvestmentComponent;
  let fixture: ComponentFixture<CrfTotalInvestmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrfTotalInvestmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrfTotalInvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
