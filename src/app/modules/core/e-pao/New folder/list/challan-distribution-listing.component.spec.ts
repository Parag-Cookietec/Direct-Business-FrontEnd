import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallanDistributionListingComponent } from './challan-distribution-listing.component';

describe('ChallanDistributionListingComponent', () => {
  let component: ChallanDistributionListingComponent;
  let fixture: ComponentFixture<ChallanDistributionListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallanDistributionListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallanDistributionListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
