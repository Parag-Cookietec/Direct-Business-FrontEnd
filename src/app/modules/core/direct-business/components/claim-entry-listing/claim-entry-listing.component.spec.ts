import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimEntryListingComponent } from './claim-entry-listing.component';

describe('ClaimEntryListingComponent', () => {
  let component: ClaimEntryListingComponent;
  let fixture: ComponentFixture<ClaimEntryListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimEntryListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimEntryListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
