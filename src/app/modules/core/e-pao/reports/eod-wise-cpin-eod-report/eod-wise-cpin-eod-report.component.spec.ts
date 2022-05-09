import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EodWiseCpinEodReportComponent } from './eod-wise-cpin-eod-report.component';

describe('EodWiseCpinEodReportComponent', () => {
  let component: EodWiseCpinEodReportComponent;
  let fixture: ComponentFixture<EodWiseCpinEodReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EodWiseCpinEodReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EodWiseCpinEodReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
