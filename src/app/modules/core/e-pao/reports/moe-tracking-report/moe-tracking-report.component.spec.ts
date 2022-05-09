import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoeTrackingReportComponent } from './moe-tracking-report.component';

describe('MoeTrackingReportComponent', () => {
  let component: MoeTrackingReportComponent;
  let fixture: ComponentFixture<MoeTrackingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoeTrackingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoeTrackingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
