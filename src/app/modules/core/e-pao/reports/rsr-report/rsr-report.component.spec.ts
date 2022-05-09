import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RsrReportComponent } from './rsr-report.component';

describe('RsrReportComponent', () => {
  let component: RsrReportComponent;
  let fixture: ComponentFixture<RsrReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RsrReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RsrReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
