import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualEntryMasterComponent } from './manual-entry-master.component';

describe('ManualEntryMasterComponent', () => {
  let component: ManualEntryMasterComponent;
  let fixture: ComponentFixture<ManualEntryMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualEntryMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualEntryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
