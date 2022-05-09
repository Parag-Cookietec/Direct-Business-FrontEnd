import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNTaxpayerReportComponent } from './top-n-taxpayer-report.component';

describe('TopNTaxpayerReportComponent', () => {
  let component: TopNTaxpayerReportComponent;
  let fixture: ComponentFixture<TopNTaxpayerReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopNTaxpayerReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNTaxpayerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
