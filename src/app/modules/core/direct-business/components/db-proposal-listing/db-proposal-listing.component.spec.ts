import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbProposalListingComponent } from './db-proposal-listing.component';

describe('DbProposalListingComponent', () => {
  let component: DbProposalListingComponent;
  let fixture: ComponentFixture<DbProposalListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbProposalListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbProposalListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
