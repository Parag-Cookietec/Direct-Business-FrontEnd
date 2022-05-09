import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScollDstributionComponent } from './scoll-dstribution.component';

describe('ScollDstributionComponent', () => {
  let component: ScollDstributionComponent;
  let fixture: ComponentFixture<ScollDstributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScollDstributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScollDstributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
