import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoNoWiseDetail } from './memo-no-wise-details.component';

describe('MemoNoWiseDetail', () => {
  let component: MemoNoWiseDetail;
  let fixture: ComponentFixture<MemoNoWiseDetail>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoNoWiseDetail ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoNoWiseDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
