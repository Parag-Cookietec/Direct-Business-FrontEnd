import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountWiseComponent } from './Amount-Wise.component';

describe('AmountWiseComponent', () => {
  let component: AmountWiseComponent;
  let fixture: ComponentFixture<AmountWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmountWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
