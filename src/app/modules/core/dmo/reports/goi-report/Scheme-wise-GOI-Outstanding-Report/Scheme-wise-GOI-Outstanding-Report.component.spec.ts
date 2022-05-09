import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemewiseGOIOutstandingReportComponent } from './Scheme-wise-GOI-Outstanding-Report.component';

describe('SchemewiseGOIOutstandingReportComponent', () => {
  let component: SchemewiseGOIOutstandingReportComponent;
  let fixture: ComponentFixture<SchemewiseGOIOutstandingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemewiseGOIOutstandingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemewiseGOIOutstandingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
