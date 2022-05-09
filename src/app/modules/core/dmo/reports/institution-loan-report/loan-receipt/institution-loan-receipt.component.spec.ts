import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionLoanReceiptComponent } from './institution-loan-receipt.component';

describe('InstitutionLoanReceiptComponent', () => {
  let component: InstitutionLoanReceiptComponent;
  let fixture: ComponentFixture<InstitutionLoanReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionLoanReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionLoanReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
