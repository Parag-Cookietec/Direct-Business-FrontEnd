import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RbiScrollFileReportComponent } from './rbi-scroll-file-report.component';

describe('RbiScrollFileReportComponent', () => {
  let component: RbiScrollFileReportComponent;
  let fixture: ComponentFixture<RbiScrollFileReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RbiScrollFileReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RbiScrollFileReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
