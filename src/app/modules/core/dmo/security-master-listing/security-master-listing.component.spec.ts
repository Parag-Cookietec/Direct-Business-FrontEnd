import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityMasterListingComponent } from './security-master-listing.component';

describe('SecurityMasterListingComponent', () => {
  let component: SecurityMasterListingComponent;
  let fixture: ComponentFixture<SecurityMasterListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityMasterListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityMasterListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
