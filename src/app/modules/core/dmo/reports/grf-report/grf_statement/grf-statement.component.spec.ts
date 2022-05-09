import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GRfStatementComponent } from './grf-statement.component';

describe('GRfStatementComponent', () => {
  let component: GRfStatementComponent;
  let fixture: ComponentFixture<GRfStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GRfStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GRfStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
