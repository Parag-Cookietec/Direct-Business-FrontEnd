import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SumRecSubRegReportComponent } from './sum-rec-sub-reg-report.component';

describe('SumRecSubRegReportComponent', () => {
  let component: SumRecSubRegReportComponent;
  let fixture: ComponentFixture<SumRecSubRegReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SumRecSubRegReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SumRecSubRegReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
