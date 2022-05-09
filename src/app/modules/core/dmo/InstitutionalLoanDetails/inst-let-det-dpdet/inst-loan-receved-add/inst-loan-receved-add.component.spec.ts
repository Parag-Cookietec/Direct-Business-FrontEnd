import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstLoanRecevedAddComponent } from './inst-loan-receved-add.component';

describe('InstLoanRecevedAddComponent', () => {
  let component: InstLoanRecevedAddComponent;
  let fixture: ComponentFixture<InstLoanRecevedAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstLoanRecevedAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstLoanRecevedAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
