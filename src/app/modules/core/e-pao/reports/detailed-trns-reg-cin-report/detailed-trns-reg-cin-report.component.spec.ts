import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedTrnsRegCinReportComponent } from './detailed-trns-reg-cin-report.component';

describe('DetailedTrnsRegCinReportComponent', () => {
  let component: DetailedTrnsRegCinReportComponent;
  let fixture: ComponentFixture<DetailedTrnsRegCinReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedTrnsRegCinReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedTrnsRegCinReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
