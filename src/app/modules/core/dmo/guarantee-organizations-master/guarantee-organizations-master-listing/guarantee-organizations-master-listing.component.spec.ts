import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuaranteeOrganizationsMasterListingComponent } from './guarantee-organizations-master-listing.component';

describe('GuaranteeOrganizationsMasterListingComponent', () => {
  let component: GuaranteeOrganizationsMasterListingComponent;
  let fixture: ComponentFixture<GuaranteeOrganizationsMasterListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuaranteeOrganizationsMasterListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuaranteeOrganizationsMasterListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
