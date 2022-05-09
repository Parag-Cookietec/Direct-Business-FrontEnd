import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingScreenComponent } from './accounting-screen.component';

describe('AccountingScreenComponent', () => {
  let component: AccountingScreenComponent;
  let fixture: ComponentFixture<AccountingScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountingScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
