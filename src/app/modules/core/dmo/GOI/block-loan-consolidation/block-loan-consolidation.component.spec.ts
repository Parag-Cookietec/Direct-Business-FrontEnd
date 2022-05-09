import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockLoanConsolidationComponent } from './block-loan-consolidation.component';

describe('BlockLoanConsolidationComponent', () => {
  let component: BlockLoanConsolidationComponent;
  let fixture: ComponentFixture<BlockLoanConsolidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockLoanConsolidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockLoanConsolidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
