import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CRfStatementComponent } from './crf-statement.component';

describe('CRfStatementComponent', () => {
  let component: CRfStatementComponent;
  let fixture: ComponentFixture<CRfStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CRfStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CRfStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
