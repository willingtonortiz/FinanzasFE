import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBillContainerComponent } from './add-bill-container.component';

describe('AddBillContainerComponent', () => {
  let component: AddBillContainerComponent;
  let fixture: ComponentFixture<AddBillContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBillContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBillContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
