import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallanNoWiseComponent } from './Challan-No-Wise.component';

describe('ChallanNoWiseComponent', () => {
  let component: ChallanNoWiseComponent;
  let fixture: ComponentFixture<ChallanNoWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallanNoWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallanNoWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
