import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyInTransitPolicyComponent } from './money-in-transit-policy.component';

describe('MoneyInTransitPolicyComponent', () => {
  let component: MoneyInTransitPolicyComponent;
  let fixture: ComponentFixture<MoneyInTransitPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyInTransitPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyInTransitPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
