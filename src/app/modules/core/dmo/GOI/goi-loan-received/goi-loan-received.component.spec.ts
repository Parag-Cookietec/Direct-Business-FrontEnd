import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoiLoanReceivedComponent } from './goi-loan-received.component';

describe('GoiLoanReceivedComponent', () => {
  let component: GoiLoanReceivedComponent;
  let fixture: ComponentFixture<GoiLoanReceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoiLoanReceivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoiLoanReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
