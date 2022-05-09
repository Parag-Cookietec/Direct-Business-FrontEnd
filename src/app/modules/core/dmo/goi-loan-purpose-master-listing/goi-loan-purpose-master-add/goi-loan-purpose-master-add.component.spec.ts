import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoiLoanPurposeMasterComponent } from './goi-loan-purpose-master-add.component';

describe('GoiLoanPurposeMasterComponent', () => {
  let component: GoiLoanPurposeMasterComponent;
  let fixture: ComponentFixture<GoiLoanPurposeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoiLoanPurposeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoiLoanPurposeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
