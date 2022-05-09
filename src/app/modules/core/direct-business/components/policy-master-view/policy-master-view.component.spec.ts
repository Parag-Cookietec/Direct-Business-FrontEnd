import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyMasterViewComponent } from './policy-master-view.component';

describe('PolicyMasterViewComponent', () => {
  let component: PolicyMasterViewComponent;
  let fixture: ComponentFixture<PolicyMasterViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyMasterViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyMasterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
