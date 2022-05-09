import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspensePlusMinusReportComponent } from './suspense-plus-minus-report.component';

describe('SuspensePlusMinusReportComponent', () => {
  let component: SuspensePlusMinusReportComponent;
  let fixture: ComponentFixture<SuspensePlusMinusReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspensePlusMinusReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspensePlusMinusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
