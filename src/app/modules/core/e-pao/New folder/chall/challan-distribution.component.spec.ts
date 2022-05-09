import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallanDistributionComponent } from './challan-distribution.component';

describe('ChallanDistributionComponent', () => {
  let component: ChallanDistributionComponent;
  let fixture: ComponentFixture<ChallanDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallanDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallanDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
