import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChkDeRecevdfrmInstComponent } from './chk-de-recevdfrm-inst.component';

describe('ChkDeRecevdfrmInstComponent', () => {
  let component: ChkDeRecevdfrmInstComponent;
  let fixture: ComponentFixture<ChkDeRecevdfrmInstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChkDeRecevdfrmInstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChkDeRecevdfrmInstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
