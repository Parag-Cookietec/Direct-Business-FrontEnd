import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GstFileAccountingListingComponent } from './gst-file-accounting-listing.component';

describe('GstFileAccountingListingComponent', () => {
  let component: GstFileAccountingListingComponent;
  let fixture: ComponentFixture<GstFileAccountingListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GstFileAccountingListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GstFileAccountingListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
