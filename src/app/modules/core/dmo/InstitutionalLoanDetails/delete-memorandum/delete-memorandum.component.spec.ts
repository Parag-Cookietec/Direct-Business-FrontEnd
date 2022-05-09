import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMemorandumComponent } from './delete-memorandum.component';

describe('DeleteMemorandumComponent', () => {
  let component: DeleteMemorandumComponent;
  let fixture: ComponentFixture<DeleteMemorandumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteMemorandumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMemorandumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
