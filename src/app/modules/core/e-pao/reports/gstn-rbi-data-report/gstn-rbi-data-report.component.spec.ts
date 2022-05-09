import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GstnRbiDataReportComponent } from './gstn-rbi-data-report.component';

describe('GstnRbiDataReportComponent', () => {
  let component: GstnRbiDataReportComponent;
  let fixture: ComponentFixture<GstnRbiDataReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GstnRbiDataReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GstnRbiDataReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
