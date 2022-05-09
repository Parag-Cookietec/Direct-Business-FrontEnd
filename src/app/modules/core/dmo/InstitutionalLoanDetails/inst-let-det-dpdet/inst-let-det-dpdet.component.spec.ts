import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstLetDetDPDetComponent } from './inst-let-det-dpdet.component';

describe('InstLetDetDPDetComponent', () => {
  let component: InstLetDetDPDetComponent;
  let fixture: ComponentFixture<InstLetDetDPDetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstLetDetDPDetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstLetDetDPDetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
