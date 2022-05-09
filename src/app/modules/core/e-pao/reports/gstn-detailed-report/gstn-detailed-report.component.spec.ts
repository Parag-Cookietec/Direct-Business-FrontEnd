import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GstnDetailedReportComponent } from './gstn-detailed-report.component';

describe('GstnDetailedReportComponent', () => {
  let component: GstnDetailedReportComponent;
  let fixture: ComponentFixture<GstnDetailedReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GstnDetailedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GstnDetailedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
