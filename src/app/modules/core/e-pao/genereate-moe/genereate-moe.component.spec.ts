import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenereateMoeComponent } from './genereate-moe.component';

describe('GenereateMoeComponent', () => {
  let component: GenereateMoeComponent;
  let fixture: ComponentFixture<GenereateMoeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenereateMoeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenereateMoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
