import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EodCpinDetailReportComponent } from './eod-cpin-detail-report.component';

describe('EodCpinDetailReportComponent', () => {
  let component: EodCpinDetailReportComponent;
  let fixture: ComponentFixture<EodCpinDetailReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EodCpinDetailReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EodCpinDetailReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
