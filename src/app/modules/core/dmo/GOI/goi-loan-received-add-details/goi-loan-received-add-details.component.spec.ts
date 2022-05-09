import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoiLoanReceivedAddDetailsComponent } from './goi-loan-received-add-details.component';

describe('GoiLoanReceivedAddDetailsComponent', () => {
  let component: GoiLoanReceivedAddDetailsComponent;
  let fixture: ComponentFixture<GoiLoanReceivedAddDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoiLoanReceivedAddDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoiLoanReceivedAddDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
