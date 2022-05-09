import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimEntryViewComponent } from './claim-entry-view.component';

describe('ClaimEntryViewComponent', () => {
  let component: ClaimEntryViewComponent;
  let fixture: ComponentFixture<ClaimEntryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimEntryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimEntryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
