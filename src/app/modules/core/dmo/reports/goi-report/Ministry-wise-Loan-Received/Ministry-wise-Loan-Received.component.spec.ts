import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinistrywiseLoanReceivedComponent } from './Ministry-wise-Loan-Received.component';

describe('MinistrywiseLoanReceivedComponent', () => {
  let component: MinistrywiseLoanReceivedComponent;
  let fixture: ComponentFixture<MinistrywiseLoanReceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinistrywiseLoanReceivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinistrywiseLoanReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
