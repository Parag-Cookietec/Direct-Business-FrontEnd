import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplementaryAccountReportComponent } from './supplementary-account-report.component';

describe('SupplementaryAccountReportComponent', () => {
  let component: SupplementaryAccountReportComponent;
  let fixture: ComponentFixture<SupplementaryAccountReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplementaryAccountReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplementaryAccountReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
