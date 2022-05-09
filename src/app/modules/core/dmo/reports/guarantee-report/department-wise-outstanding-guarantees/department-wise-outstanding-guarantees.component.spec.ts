import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentWiseOutstandingGuaranteesComponent } from './department-wise-outstanding-guarantees.component';
describe('DepartmentWiseOutstandingGuaranteesComponent', () => {
  let component: DepartmentWiseOutstandingGuaranteesComponent;
  let fixture: ComponentFixture<DepartmentWiseOutstandingGuaranteesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentWiseOutstandingGuaranteesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentWiseOutstandingGuaranteesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
