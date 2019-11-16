import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountedPoolGroupComponent } from './discounted-pool-group.component';

describe('DiscountedPoolGroupComponent', () => {
  let component: DiscountedPoolGroupComponent;
  let fixture: ComponentFixture<DiscountedPoolGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountedPoolGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountedPoolGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
