import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeWiseTaxpayerReportComponent } from './mode-wise-taxpayer-report.component';

describe('ModeWiseTaxpayerReportComponent', () => {
  let component: ModeWiseTaxpayerReportComponent;
  let fixture: ComponentFixture<ModeWiseTaxpayerReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeWiseTaxpayerReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeWiseTaxpayerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
