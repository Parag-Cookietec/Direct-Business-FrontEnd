import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenalInterestReportTcComponent } from './penal-interest-report-tc.component';

describe('PenalInterestReportTcComponent', () => {
  let component: PenalInterestReportTcComponent;
  let fixture: ComponentFixture<PenalInterestReportTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenalInterestReportTcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenalInterestReportTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
