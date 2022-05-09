import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidChequeComponent } from './paid-cheque.component';

describe('PaidChequeComponent', () => {
  let component: PaidChequeComponent;
  let fixture: ComponentFixture<PaidChequeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidChequeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidChequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
