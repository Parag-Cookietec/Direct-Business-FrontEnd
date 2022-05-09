import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardFirePolicyComponent } from './standard-fire-policy.component';

describe('StandardFirePolicyComponent', () => {
  let component: StandardFirePolicyComponent;
  let fixture: ComponentFixture<StandardFirePolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardFirePolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardFirePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
