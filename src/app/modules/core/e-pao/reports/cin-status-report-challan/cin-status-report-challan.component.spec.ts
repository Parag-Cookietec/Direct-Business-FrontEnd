import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CinStatusReportChallanComponent } from './cin-status-report-challan.component';

describe('CinStatusReportChallanComponent', () => {
  let component: CinStatusReportChallanComponent;
  let fixture: ComponentFixture<CinStatusReportChallanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CinStatusReportChallanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CinStatusReportChallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
