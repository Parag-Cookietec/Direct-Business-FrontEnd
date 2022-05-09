import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateModeListingComponent } from './generate-mode-listing.component';

describe('GenerateModeListingComponent', () => {
  let component: GenerateModeListingComponent;
  let fixture: ComponentFixture<GenerateModeListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateModeListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateModeListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
