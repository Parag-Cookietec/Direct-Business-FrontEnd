import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaiationPolicyComponent } from './avaiation-policy.component';

describe('AvaiationPolicyComponent', () => {
  let component: AvaiationPolicyComponent;
  let fixture: ComponentFixture<AvaiationPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvaiationPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaiationPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
