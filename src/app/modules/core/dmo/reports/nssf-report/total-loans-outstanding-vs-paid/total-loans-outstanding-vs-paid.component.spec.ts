import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { outstandingvspaid } from './total-loans-outstanding-vs-paid.component';

describe('outstandingvspaid', () => {
  let component: outstandingvspaid;
  let fixture: ComponentFixture<outstandingvspaid>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ outstandingvspaid ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(outstandingvspaid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
