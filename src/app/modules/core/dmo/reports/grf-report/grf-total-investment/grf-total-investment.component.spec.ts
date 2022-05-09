import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrfTotalInvestmentComponent } from './grf-total-investment.component';

describe('GrfTotalInvestmentComponent', () => {
  let component: GrfTotalInvestmentComponent;
  let fixture: ComponentFixture<GrfTotalInvestmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrfTotalInvestmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrfTotalInvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
