import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedBillModalComponent } from './created-bill-modal.component';

describe('CreatedBillModalComponent', () => {
  let component: CreatedBillModalComponent;
  let fixture: ComponentFixture<CreatedBillModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedBillModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedBillModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
