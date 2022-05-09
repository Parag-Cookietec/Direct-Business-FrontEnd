import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrfYearWiseOfInvestmentComponent } from './grf-year-wise-of-investment.component';

describe('GrfYearWiseOfInvestmentComponent', () => {
  let component: GrfYearWiseOfInvestmentComponent;
  let fixture: ComponentFixture<GrfYearWiseOfInvestmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrfYearWiseOfInvestmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrfYearWiseOfInvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
