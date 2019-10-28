import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBillContainerComponent } from './select-bill-container.component';

describe('SelectBillContainerComponent', () => {
  let component: SelectBillContainerComponent;
  let fixture: ComponentFixture<SelectBillContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectBillContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBillContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
