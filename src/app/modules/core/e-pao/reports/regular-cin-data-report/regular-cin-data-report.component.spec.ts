import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularCinDataReportComponent } from './regular-cin-data-report.component';

describe('RegularCinDataReportComponent', () => {
  let component: RegularCinDataReportComponent;
  let fixture: ComponentFixture<RegularCinDataReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegularCinDataReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularCinDataReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
