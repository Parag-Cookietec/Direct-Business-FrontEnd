import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankRateMasterComponent } from './bank-rate-master.component';

describe('BankRateMasterComponent', () => {
  let component: BankRateMasterComponent;
  let fixture: ComponentFixture<BankRateMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankRateMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankRateMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
