import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRepaidComponent } from './loan-repaid.component';

describe('LoanRepaidComponent', () => {
  let component: LoanRepaidComponent;
  let fixture: ComponentFixture<LoanRepaidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanRepaidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanRepaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
