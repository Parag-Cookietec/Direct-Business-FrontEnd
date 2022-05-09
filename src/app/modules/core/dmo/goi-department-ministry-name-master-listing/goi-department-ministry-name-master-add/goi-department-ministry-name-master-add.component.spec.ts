import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GOIDepartmentMinistryNameMasterAddComponent } from './goi-department-ministry-name-master-add.component';

describe('GOIDepartmentMinistryNameMasterAddComponent', () => {
  let component: GOIDepartmentMinistryNameMasterAddComponent;
  let fixture: ComponentFixture<GOIDepartmentMinistryNameMasterAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GOIDepartmentMinistryNameMasterAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GOIDepartmentMinistryNameMasterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
