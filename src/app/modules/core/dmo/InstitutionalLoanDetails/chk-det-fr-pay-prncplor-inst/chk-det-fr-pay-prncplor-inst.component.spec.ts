import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChkDetFrPayPrncplorInstComponent } from './chk-det-fr-pay-prncplor-inst.component';

describe('ChkDetFrPayPrncplorInstComponent', () => {
  let component: ChkDetFrPayPrncplorInstComponent;
  let fixture: ComponentFixture<ChkDetFrPayPrncplorInstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChkDetFrPayPrncplorInstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChkDetFrPayPrncplorInstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
