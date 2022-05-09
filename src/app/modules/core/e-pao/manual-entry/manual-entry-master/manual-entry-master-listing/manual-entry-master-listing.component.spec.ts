import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualEntryMasterListingComponent } from './manual-entry-master-listing.component';

describe('ManualEntryMasterListingComponent', () => {
  let component: ManualEntryMasterListingComponent;
  let fixture: ComponentFixture<ManualEntryMasterListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualEntryMasterListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualEntryMasterListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
