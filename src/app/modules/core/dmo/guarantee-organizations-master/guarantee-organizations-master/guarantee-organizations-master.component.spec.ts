import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuaranteeOrganizationsMasterComponent } from './guarantee-organizations-master.component';

describe('GuaranteeOrganizationsMasterComponent', () => {
  let component: GuaranteeOrganizationsMasterComponent;
  let fixture: ComponentFixture<GuaranteeOrganizationsMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuaranteeOrganizationsMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuaranteeOrganizationsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
