import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadBalancerHaComponent } from './load-balancer-ha.component';

describe('LoadBalancerHaComponent', () => {
  let component: LoadBalancerHaComponent;
  let fixture: ComponentFixture<LoadBalancerHaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadBalancerHaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadBalancerHaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
