import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherDetailReportComponent } from './voucher-detail-report.component';

describe('VoucherDetailReportComponent', () => {
  let component: VoucherDetailReportComponent;
  let fixture: ComponentFixture<VoucherDetailReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoucherDetailReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherDetailReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
