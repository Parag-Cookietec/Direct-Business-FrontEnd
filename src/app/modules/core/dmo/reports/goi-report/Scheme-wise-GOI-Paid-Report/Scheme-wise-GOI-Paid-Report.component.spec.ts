import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemewiseGOIPaidReportComponent } from './Scheme-wise-GOI-Paid-Report.component';

describe('SchemewiseGOIPaidReportComponent', () => {
  let component: SchemewiseGOIPaidReportComponent;
  let fixture: ComponentFixture<SchemewiseGOIPaidReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemewiseGOIPaidReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemewiseGOIPaidReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
