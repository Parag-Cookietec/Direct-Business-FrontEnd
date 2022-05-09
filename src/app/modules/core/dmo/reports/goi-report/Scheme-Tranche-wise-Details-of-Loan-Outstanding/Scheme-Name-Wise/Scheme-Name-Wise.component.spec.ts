import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeNameWiseComponent } from './Scheme-Name-Wise.component';

describe('SchemenamewiseComponent', () => {
  let component: SchemeNameWiseComponent;
  let fixture: ComponentFixture<SchemeNameWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemeNameWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeNameWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
