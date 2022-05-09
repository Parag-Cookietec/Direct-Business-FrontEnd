import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadBalancerAoComponent } from './load-balancer-ao.component';

describe('LoadBalancerAoComponent', () => {
  let component: LoadBalancerAoComponent;
  let fixture: ComponentFixture<LoadBalancerAoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadBalancerAoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadBalancerAoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
