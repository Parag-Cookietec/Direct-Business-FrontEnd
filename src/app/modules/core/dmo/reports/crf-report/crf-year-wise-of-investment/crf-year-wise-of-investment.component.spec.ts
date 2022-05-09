import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrfYearWiseOfInvestmentComponent } from './crf-year-wise-of-investment.component';

describe('CrfYearWiseOfInvestmentComponent', () => {
  let component: CrfYearWiseOfInvestmentComponent;
  let fixture: ComponentFixture<CrfYearWiseOfInvestmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrfYearWiseOfInvestmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrfYearWiseOfInvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
