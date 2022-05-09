import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteLetterDetailsComponent } from './institute-letter-details.component';

describe('InstituteLetterDetailsComponent', () => {
  let component: InstituteLetterDetailsComponent;
  let fixture: ComponentFixture<InstituteLetterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstituteLetterDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteLetterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
