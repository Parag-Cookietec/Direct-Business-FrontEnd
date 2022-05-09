import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimEntryListingApplicationAcceptedComponent } from './claim-entry-listing-application-accepted.component';

describe('ClaimEntryListingApplicationAcceptedComponent', () => {
  let component: ClaimEntryListingApplicationAcceptedComponent;
  let fixture: ComponentFixture<ClaimEntryListingApplicationAcceptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimEntryListingApplicationAcceptedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimEntryListingApplicationAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
