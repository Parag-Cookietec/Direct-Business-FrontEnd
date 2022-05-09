import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparativeReceiptsReportComponent } from './comparative-receipts-report.component';

describe('ComparativeReceiptsReportComponent', () => {
  let component: ComparativeReceiptsReportComponent;
  let fixture: ComponentFixture<ComparativeReceiptsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparativeReceiptsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparativeReceiptsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
