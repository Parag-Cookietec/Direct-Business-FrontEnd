import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimEntryListingSendForApprovalComponent } from './claim-entry-listing-send-for-approval.component';

describe('ClaimEntryListingSendForApprovalComponent', () => {
  let component: ClaimEntryListingSendForApprovalComponent;
  let fixture: ComponentFixture<ClaimEntryListingSendForApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimEntryListingSendForApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimEntryListingSendForApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
