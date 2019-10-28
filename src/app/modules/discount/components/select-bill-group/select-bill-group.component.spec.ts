import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBillGroupComponent } from './select-bill-group.component';

describe('SelectBillGroupComponent', () => {
  let component: SelectBillGroupComponent;
  let fixture: ComponentFixture<SelectBillGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectBillGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBillGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
