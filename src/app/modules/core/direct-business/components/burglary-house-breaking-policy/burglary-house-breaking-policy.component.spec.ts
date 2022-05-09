import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BurglaryHouseBreakingPolicyComponent } from './burglary-house-breaking-policy.component';

describe('BurglaryHouseBreakingPolicyComponent', () => {
  let component: BurglaryHouseBreakingPolicyComponent;
  let fixture: ComponentFixture<BurglaryHouseBreakingPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BurglaryHouseBreakingPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BurglaryHouseBreakingPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
