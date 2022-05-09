import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockCpinReportComponent } from './block-cpin-report.component';

describe('BlockCpinReportComponent', () => {
  let component: BlockCpinReportComponent;
  let fixture: ComponentFixture<BlockCpinReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockCpinReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockCpinReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
