import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountPoolOverviewComponent } from './discount-pool-overview.component';

describe('DiscountPoolOverviewComponent', () => {
  let component: DiscountPoolOverviewComponent;
  let fixture: ComponentFixture<DiscountPoolOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountPoolOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountPoolOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
