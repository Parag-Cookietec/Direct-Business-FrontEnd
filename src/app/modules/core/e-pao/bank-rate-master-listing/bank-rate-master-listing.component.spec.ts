import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankRateMasterListingComponent } from './bank-rate-master-listing.component';

describe('BankRateMasterListingComponent', () => {
  let component: BankRateMasterListingComponent;
  let fixture: ComponentFixture<BankRateMasterListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankRateMasterListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankRateMasterListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
