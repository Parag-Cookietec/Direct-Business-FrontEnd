import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviceMasterAddComponent } from './advice-master-add.component';

describe('AdviceMasterAddComponent', () => {
  let component: AdviceMasterAddComponent;
  let fixture: ComponentFixture<AdviceMasterAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdviceMasterAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdviceMasterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
