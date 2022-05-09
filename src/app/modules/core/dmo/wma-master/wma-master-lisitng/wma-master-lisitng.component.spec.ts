import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WmaMasterLisitngComponent } from './wma-master-lisitng.component';

describe('WmaMasterLisitngComponent', () => {
  let component: WmaMasterLisitngComponent;
  let fixture: ComponentFixture<WmaMasterLisitngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WmaMasterLisitngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WmaMasterLisitngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
