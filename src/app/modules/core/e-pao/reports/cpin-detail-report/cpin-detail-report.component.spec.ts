import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpinDetailReportComponent } from './cpin-detail-report.component';

describe('CpinDetailReportComponent', () => {
  let component: CpinDetailReportComponent;
  let fixture: ComponentFixture<CpinDetailReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpinDetailReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpinDetailReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
