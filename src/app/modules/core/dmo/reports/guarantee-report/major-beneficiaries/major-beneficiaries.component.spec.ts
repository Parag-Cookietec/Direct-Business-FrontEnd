import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorBeneficiariesComponent } from './major-beneficiaries.component';
describe('MajorBeneficiariesComponent', () => {
  let component: MajorBeneficiariesComponent;
  let fixture: ComponentFixture<MajorBeneficiariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MajorBeneficiariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MajorBeneficiariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
