import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteChequePaidComponent } from './institution-cheque-paid.component';

describe('InstituteChequePaidComponent', () => {
  let component: InstituteChequePaidComponent;
  let fixture: ComponentFixture<InstituteChequePaidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstituteChequePaidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteChequePaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
