import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteMasterComponent } from './institute-master-listing-add.component';

describe('InstituteMasterComponent', () => {
  let component: InstituteMasterComponent;
  let fixture: ComponentFixture<InstituteMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstituteMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
