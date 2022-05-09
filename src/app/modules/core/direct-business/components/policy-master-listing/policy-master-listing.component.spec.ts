import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyMasterListingComponent } from './policy-master-listing.component';

describe('PolicyMasterListingComponent', () => {
  let component: PolicyMasterListingComponent;
  let fixture: ComponentFixture<PolicyMasterListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyMasterListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyMasterListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
