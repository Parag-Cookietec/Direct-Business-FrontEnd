import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanoutstandingComponent } from './loan-outstanding.component';

describe('LoanoutstandingComponent', () => {
  let component: LoanoutstandingComponent;
  let fixture: ComponentFixture<LoanoutstandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanoutstandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanoutstandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
