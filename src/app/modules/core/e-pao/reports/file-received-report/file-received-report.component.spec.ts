import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileReceivedReportComponent } from './file-received-report.component';

describe('FileReceivedReportComponent', () => {
  let component: FileReceivedReportComponent;
  let fixture: ComponentFixture<FileReceivedReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileReceivedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileReceivedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
