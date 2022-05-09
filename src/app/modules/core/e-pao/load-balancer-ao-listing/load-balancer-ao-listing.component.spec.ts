import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadBalancerAoListingComponent } from './load-balancer-ao-listing.component';

describe('LoadBalancerAoListingComponent', () => {
  let component: LoadBalancerAoListingComponent;
  let fixture: ComponentFixture<LoadBalancerAoListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadBalancerAoListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadBalancerAoListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
