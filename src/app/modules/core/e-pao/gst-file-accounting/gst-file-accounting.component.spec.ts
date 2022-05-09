import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GstFileAccountingComponent } from './gst-file-accounting.component';

describe('GstFileAccountingComponent', () => {
  let component: GstFileAccountingComponent;
  let fixture: ComponentFixture<GstFileAccountingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GstFileAccountingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GstFileAccountingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
