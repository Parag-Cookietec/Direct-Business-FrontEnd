import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CinStatusReportComponent } from './cin-status-report.component';

describe('CinStatusReportComponent', () => {
  let component: CinStatusReportComponent;
  let fixture: ComponentFixture<CinStatusReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CinStatusReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CinStatusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
