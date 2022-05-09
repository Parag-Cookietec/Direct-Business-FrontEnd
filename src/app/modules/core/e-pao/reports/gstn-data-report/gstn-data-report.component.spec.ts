import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GstnDataReportComponent } from './gstn-data-report.component';

describe('GstnDataReportComponent', () => {
  let component: GstnDataReportComponent;
  let fixture: ComponentFixture<GstnDataReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GstnDataReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GstnDataReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
