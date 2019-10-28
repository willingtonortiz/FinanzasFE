import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountedBillComponent } from './discounted-bill.component';

describe('DiscountedBillComponent', () => {
  let component: DiscountedBillComponent;
  let fixture: ComponentFixture<DiscountedBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountedBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountedBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
