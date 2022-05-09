import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteMasterListingComponent } from './institute-master-listing.component';

describe('InstituteMasterListingComponent', () => {
  let component: InstituteMasterListingComponent;
  let fixture: ComponentFixture<InstituteMasterListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstituteMasterListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteMasterListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
