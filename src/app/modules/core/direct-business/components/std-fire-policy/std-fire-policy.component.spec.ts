import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StdFirePolicyComponent } from './std-fire-policy.component';

describe('StdFirePolicyComponent', () => {
  let component: StdFirePolicyComponent;
  let fixture: ComponentFixture<StdFirePolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StdFirePolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StdFirePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
