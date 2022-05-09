import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockCpinListingComponent } from './block-cpin-listing.component';

describe('BlockCpinListingComponent', () => {
  let component: BlockCpinListingComponent;
  let fixture: ComponentFixture<BlockCpinListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockCpinListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockCpinListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
