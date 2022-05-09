import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthwiseorDateWiseLiabilityReportComponent } from './Month-wise-or-Date-Wise-Liability-Report.component';

describe('MonthwiseorDateWiseLiabilityReportComponent', () => {
  let component: MonthwiseorDateWiseLiabilityReportComponent;
  let fixture: ComponentFixture<MonthwiseorDateWiseLiabilityReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthwiseorDateWiseLiabilityReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthwiseorDateWiseLiabilityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
