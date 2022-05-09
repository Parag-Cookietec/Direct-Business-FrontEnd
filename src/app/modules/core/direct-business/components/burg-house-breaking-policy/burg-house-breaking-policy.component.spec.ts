import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BurgHouseBreakingPolicyComponent } from './burg-house-breaking-policy.component';

describe('BurgHouseBreakingPolicyComponent', () => {
  let component: BurgHouseBreakingPolicyComponent;
  let fixture: ComponentFixture<BurgHouseBreakingPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BurgHouseBreakingPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BurgHouseBreakingPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
