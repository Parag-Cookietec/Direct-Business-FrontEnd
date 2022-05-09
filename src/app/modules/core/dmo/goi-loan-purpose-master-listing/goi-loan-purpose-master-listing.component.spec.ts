import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoiLoanPurposeMasterListingComponent } from './goi-loan-purpose-master-listing.component';

describe('GoiLoanPurposeMasterListingComponent', () => {
  let component: GoiLoanPurposeMasterListingComponent;
  let fixture: ComponentFixture<GoiLoanPurposeMasterListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoiLoanPurposeMasterListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoiLoanPurposeMasterListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
