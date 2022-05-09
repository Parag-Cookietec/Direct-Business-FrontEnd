import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicEquipPolicyComponent } from './electronic-equip-policy.component';

describe('ElectronicEquipPolicyComponent', () => {
  let component: ElectronicEquipPolicyComponent;
  let fixture: ComponentFixture<ElectronicEquipPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectronicEquipPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectronicEquipPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
