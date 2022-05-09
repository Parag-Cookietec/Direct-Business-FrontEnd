import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CinEodcinDiffReportComponent } from './cin-eodcin-diff-report.component';

describe('CinEodcinDiffReportComponent', () => {
  let component: CinEodcinDiffReportComponent;
  let fixture: ComponentFixture<CinEodcinDiffReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CinEodcinDiffReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CinEodcinDiffReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
