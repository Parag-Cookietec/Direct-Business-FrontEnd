import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RbiAccStatReportComponent } from './rbi-acc-stat-report.component';

describe('RbiAccStatReportComponent', () => {
  let component: RbiAccStatReportComponent;
  let fixture: ComponentFixture<RbiAccStatReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RbiAccStatReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RbiAccStatReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
