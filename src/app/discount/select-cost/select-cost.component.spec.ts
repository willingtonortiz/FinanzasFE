import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCostComponent } from './select-cost.component';

describe('SelectCostComponent', () => {
  let component: SelectCostComponent;
  let fixture: ComponentFixture<SelectCostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
