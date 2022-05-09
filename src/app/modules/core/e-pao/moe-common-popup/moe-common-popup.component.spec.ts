import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoeCommonPopupComponent } from './moe-common-popup.component';

describe('MoeCommonPopupComponent', () => {
  let component: MoeCommonPopupComponent;
  let fixture: ComponentFixture<MoeCommonPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoeCommonPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoeCommonPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
