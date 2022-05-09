import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EodCinDetailsReportComponent } from './eod-cin-details-report.component';

describe('EodCinDetailsReportComponent', () => {
  let component: EodCinDetailsReportComponent;
  let fixture: ComponentFixture<EodCinDetailsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EodCinDetailsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EodCinDetailsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
