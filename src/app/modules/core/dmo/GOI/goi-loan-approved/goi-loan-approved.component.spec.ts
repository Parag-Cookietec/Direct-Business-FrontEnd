import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoiLoanApprovedComponent } from './goi-loan-approved.component';

describe('GoiLoanApprovedComponent', () => {
  let component: GoiLoanApprovedComponent;
  let fixture: ComponentFixture<GoiLoanApprovedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoiLoanApprovedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoiLoanApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
