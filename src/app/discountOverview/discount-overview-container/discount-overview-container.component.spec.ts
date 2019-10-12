import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountOverviewContainerComponent } from './discount-overview-container.component';

describe('DiscountOverviewContainerComponent', () => {
  let component: DiscountOverviewContainerComponent;
  let fixture: ComponentFixture<DiscountOverviewContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountOverviewContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountOverviewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
