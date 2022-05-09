import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyOfferViewComponent } from './policy-offer-view.component';

describe('PolicyOfferViewComponent', () => {
  let component: PolicyOfferViewComponent;
  let fixture: ComponentFixture<PolicyOfferViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyOfferViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyOfferViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
