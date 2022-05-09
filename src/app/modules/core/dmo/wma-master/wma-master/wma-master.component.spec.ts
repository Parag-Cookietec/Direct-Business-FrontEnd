import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WmaMasterComponent } from './wma-master.component';

describe('WmaMasterComponent', () => {
  let component: WmaMasterComponent;
  let fixture: ComponentFixture<WmaMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WmaMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WmaMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
