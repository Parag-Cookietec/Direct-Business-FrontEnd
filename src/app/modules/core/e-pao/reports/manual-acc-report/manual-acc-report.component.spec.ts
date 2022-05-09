import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualAccReportComponent } from './manual-acc-report.component';

describe('ManualAccReportComponent', () => {
  let component: ManualAccReportComponent;
  let fixture: ComponentFixture<ManualAccReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualAccReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualAccReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
