import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoGenDetComponent } from './memo-gen-det.component';

describe('MemoGenDetComponent', () => {
  let component: MemoGenDetComponent;
  let fixture: ComponentFixture<MemoGenDetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoGenDetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoGenDetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
