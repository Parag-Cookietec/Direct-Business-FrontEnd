import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityNameMasterComponent } from './security-master-add.component';

describe('SecurityNameMasterComponent', () => {
  let component: SecurityNameMasterComponent;
  let fixture: ComponentFixture<SecurityNameMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityNameMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityNameMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
