import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetIssuanceofGuaranteesComponent } from './net-issuance-of-guarantees.component';
describe('NetIssuanceofGuaranteesComponent', () => {
  let component: NetIssuanceofGuaranteesComponent;
  let fixture: ComponentFixture<NetIssuanceofGuaranteesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetIssuanceofGuaranteesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetIssuanceofGuaranteesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
