import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularEodcinDataReportComponent } from './regular-eodcin-data-report.component';

describe('RegularEodcinDataReportComponent', () => {
  let component: RegularEodcinDataReportComponent;
  let fixture: ComponentFixture<RegularEodcinDataReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegularEodcinDataReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularEodcinDataReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
