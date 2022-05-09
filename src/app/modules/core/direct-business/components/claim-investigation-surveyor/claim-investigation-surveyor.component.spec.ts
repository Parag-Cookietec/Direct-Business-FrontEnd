import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimInvestigationSurveyorComponent } from './claim-investigation-surveyor.component';

describe('ClaimInvestigationSurveyorComponent', () => {
  let component: ClaimInvestigationSurveyorComponent;
  let fixture: ComponentFixture<ClaimInvestigationSurveyorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimInvestigationSurveyorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimInvestigationSurveyorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
