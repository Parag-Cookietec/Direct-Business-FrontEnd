import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoiDepartmentMinistryNameMasterComponent } from './goi-department-ministry-name-master-listing.component';

describe('GoiDepartmentMinistryNameMasterComponent', () => {
  let component: GoiDepartmentMinistryNameMasterComponent;
  let fixture: ComponentFixture<GoiDepartmentMinistryNameMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoiDepartmentMinistryNameMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoiDepartmentMinistryNameMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
