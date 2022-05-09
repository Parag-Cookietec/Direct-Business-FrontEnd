import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviceMasterListingComponent } from './advice-master-listing.component';

describe('AdviceMasterListingComponent', () => {
  let component: AdviceMasterListingComponent;
  let fixture: ComponentFixture<AdviceMasterListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdviceMasterListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdviceMasterListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
