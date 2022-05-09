import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingScreenListingComponent } from './accounting-screen-listing.component';

describe('AccountingScreenListingComponent', () => {
  let component: AccountingScreenListingComponent;
  let fixture: ComponentFixture<AccountingScreenListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountingScreenListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingScreenListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
