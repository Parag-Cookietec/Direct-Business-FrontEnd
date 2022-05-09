import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenalInterestReportComponent } from './penal-interest-report.component';

describe('PenalInterestReportComponent', () => {
  let component: PenalInterestReportComponent;
  let fixture: ComponentFixture<PenalInterestReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenalInterestReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenalInterestReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
