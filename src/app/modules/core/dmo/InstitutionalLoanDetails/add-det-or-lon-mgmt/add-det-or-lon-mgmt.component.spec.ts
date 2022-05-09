import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDetOrLonMgmtComponent } from './add-det-or-lon-mgmt.component';

describe('AddDetOrLonMgmtComponent', () => {
  let component: AddDetOrLonMgmtComponent;
  let fixture: ComponentFixture<AddDetOrLonMgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDetOrLonMgmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDetOrLonMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
