import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBillComponent } from './select-bill.component';

describe('SelectBillComponent', () => {
  let component: SelectBillComponent;
  let fixture: ComponentFixture<SelectBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
