import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrancheWiseComponent } from './Tranche-Wise.component';

describe('TrancheWiseComponent', () => {
  let component: TrancheWiseComponent;
  let fixture: ComponentFixture<TrancheWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrancheWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrancheWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
