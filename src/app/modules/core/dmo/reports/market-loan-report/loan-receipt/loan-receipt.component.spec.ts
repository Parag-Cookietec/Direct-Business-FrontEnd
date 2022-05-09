import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanReceiptComponent } from './loan-receipt.component';

describe('LoanReceiptComponent', () => {
  let component: LoanReceiptComponent;
  let fixture: ComponentFixture<LoanReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
