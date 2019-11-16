import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDiscountPoolsFoundComponent } from './no-discount-pools-found.component';

describe('NoDiscountPoolsFoundComponent', () => {
  let component: NoDiscountPoolsFoundComponent;
  let fixture: ComponentFixture<NoDiscountPoolsFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoDiscountPoolsFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoDiscountPoolsFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
