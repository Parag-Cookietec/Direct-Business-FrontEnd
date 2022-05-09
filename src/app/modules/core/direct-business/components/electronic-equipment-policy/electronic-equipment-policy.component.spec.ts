import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicEquipmentPolicyComponent } from './electronic-equipment-policy.component';

describe('ElectronicEquipmentPolicyComponent', () => {
  let component: ElectronicEquipmentPolicyComponent;
  let fixture: ComponentFixture<ElectronicEquipmentPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectronicEquipmentPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectronicEquipmentPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
