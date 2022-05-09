import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenaltyAmountReceiveComponent } from './penalty-amount-receive.component';

describe('PenaltyAmountReceiveComponent', () => {
  let component: PenaltyAmountReceiveComponent;
  let fixture: ComponentFixture<PenaltyAmountReceiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenaltyAmountReceiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenaltyAmountReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
