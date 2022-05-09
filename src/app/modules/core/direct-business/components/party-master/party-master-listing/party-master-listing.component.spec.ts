import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyMasterListingComponent } from './party-master-listing.component';

describe('PartyMasterListingComponent', () => {
  let component: PartyMasterListingComponent;
  let fixture: ComponentFixture<PartyMasterListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyMasterListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyMasterListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
