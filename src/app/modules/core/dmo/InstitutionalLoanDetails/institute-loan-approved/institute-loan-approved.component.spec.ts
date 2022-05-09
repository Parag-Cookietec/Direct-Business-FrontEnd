import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteLoanApprovedComponent } from './institute-loan-approved.component';

describe('InstituteLoanApprovedComponent', () => {
  let component: InstituteLoanApprovedComponent;
  let fixture: ComponentFixture<InstituteLoanApprovedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstituteLoanApprovedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteLoanApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
