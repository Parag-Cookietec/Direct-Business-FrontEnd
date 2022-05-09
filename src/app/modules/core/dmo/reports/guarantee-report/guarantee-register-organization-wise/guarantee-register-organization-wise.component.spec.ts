import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuaranteeRegisterOrganizationWiseComponent } from './guarantee-register-organization-wise.component';
describe('GuaranteeRegisterOrganizationWiseComponent', () => {
  let component: GuaranteeRegisterOrganizationWiseComponent;
  let fixture: ComponentFixture<GuaranteeRegisterOrganizationWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuaranteeRegisterOrganizationWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuaranteeRegisterOrganizationWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
