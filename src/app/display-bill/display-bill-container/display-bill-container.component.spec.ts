import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayBillContainerComponent } from './display-bill-container.component';

describe('DisplayBillContainerComponent', () => {
  let component: DisplayBillContainerComponent;
  let fixture: ComponentFixture<DisplayBillContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayBillContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayBillContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
