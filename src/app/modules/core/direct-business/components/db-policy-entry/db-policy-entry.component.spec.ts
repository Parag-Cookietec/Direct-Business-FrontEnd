import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbPolicyEntryComponent } from './db-policy-entry.component';

describe('DbPolicyEntryComponent', () => {
  let component: DbPolicyEntryComponent;
  let fixture: ComponentFixture<DbPolicyEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbPolicyEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbPolicyEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
