import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RbiScrollVsStatementReportComponent } from './rbi-scroll-vs-statement-report.component';

describe('RbiScrollVsStatementReportComponent', () => {
  let component: RbiScrollVsStatementReportComponent;
  let fixture: ComponentFixture<RbiScrollVsStatementReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RbiScrollVsStatementReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RbiScrollVsStatementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
