import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RbdReportComponent } from './rbd-report.component';

describe('RbdReportComponent', () => {
  let component: RbdReportComponent;
  let fixture: ComponentFixture<RbdReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RbdReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RbdReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
