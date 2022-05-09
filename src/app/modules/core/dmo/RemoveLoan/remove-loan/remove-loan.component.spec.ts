import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoveLoanComponent } from './remove-loan.component';

describe('RmoveLoanComponent', () => {
  let component: RemoveLoanComponent;
  let fixture: ComponentFixture<RemoveLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
