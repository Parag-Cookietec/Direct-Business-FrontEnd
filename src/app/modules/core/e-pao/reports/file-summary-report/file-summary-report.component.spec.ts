import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSummaryReportComponent } from './file-summary-report.component';

describe('FileSummaryReportComponent', () => {
  let component: FileSummaryReportComponent;
  let fixture: ComponentFixture<FileSummaryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileSummaryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileSummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
