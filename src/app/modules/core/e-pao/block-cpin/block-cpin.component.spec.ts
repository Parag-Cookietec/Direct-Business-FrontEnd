import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockCpinComponent } from './block-cpin.component';

describe('BlockCpinComponent', () => {
  let component: BlockCpinComponent;
  let fixture: ComponentFixture<BlockCpinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockCpinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockCpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
