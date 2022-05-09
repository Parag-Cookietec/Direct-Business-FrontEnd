import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CinCpinStatusComponent } from './cin-cpin-status.component';

describe('CinCpinStatusComponent', () => {
  let component: CinCpinStatusComponent;
  let fixture: ComponentFixture<CinCpinStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CinCpinStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CinCpinStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
