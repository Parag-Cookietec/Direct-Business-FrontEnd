import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInstLetDetComponent } from './update-inst-let-det.component';

describe('UpdateInstLetDetComponent', () => {
  let component: UpdateInstLetDetComponent;
  let fixture: ComponentFixture<UpdateInstLetDetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateInstLetDetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInstLetDetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
