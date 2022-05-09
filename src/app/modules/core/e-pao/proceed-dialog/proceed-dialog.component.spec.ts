import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceedDialogComponent } from './proceed-dialog.component';

describe('ProceedDialogComponent', () => {
  let component: ProceedDialogComponent;
  let fixture: ComponentFixture<ProceedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProceedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProceedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
