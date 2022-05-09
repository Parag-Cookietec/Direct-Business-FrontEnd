import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollDistributionListingComponent } from './scroll-distribution-listing.component';

describe('ScrollDistributionListingComponent', () => {
  let component: ScrollDistributionListingComponent;
  let fixture: ComponentFixture<ScrollDistributionListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollDistributionListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollDistributionListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
