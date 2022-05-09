import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RbiEScrollWiseStatusReportComponent } from './rbi-e-scroll-wise-status-report.component';

describe('RbiEScrollWiseStatusReportComponent', () => {
  let component: RbiEScrollWiseStatusReportComponent;
  let fixture: ComponentFixture<RbiEScrollWiseStatusReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RbiEScrollWiseStatusReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RbiEScrollWiseStatusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
