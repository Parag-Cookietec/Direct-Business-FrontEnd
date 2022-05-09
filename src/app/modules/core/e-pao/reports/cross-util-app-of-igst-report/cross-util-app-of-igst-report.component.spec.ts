import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossUtilAppOfIgstReportComponent } from './cross-util-app-of-igst-report.component';

describe('CrossUtilAppOfIgstReportComponent', () => {
  let component: CrossUtilAppOfIgstReportComponent;
  let fixture: ComponentFixture<CrossUtilAppOfIgstReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrossUtilAppOfIgstReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossUtilAppOfIgstReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
