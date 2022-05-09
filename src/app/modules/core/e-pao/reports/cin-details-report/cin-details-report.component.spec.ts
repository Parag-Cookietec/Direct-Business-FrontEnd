import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CinDetailsReportComponent } from './cin-details-report.component';

describe('CinDetailsReportComponent', () => {
  let component: CinDetailsReportComponent;
  let fixture: ComponentFixture<CinDetailsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CinDetailsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CinDetailsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
