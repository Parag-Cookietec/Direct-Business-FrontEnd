import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadBalancerHaListingComponent } from './load-balancer-ha-listing.component';

describe('LoadBalancerHaListingComponent', () => {
  let component: LoadBalancerHaListingComponent;
  let fixture: ComponentFixture<LoadBalancerHaListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadBalancerHaListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadBalancerHaListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
