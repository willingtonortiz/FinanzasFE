import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillProgressBarComponent } from './bill-progress-bar.component';

describe('BillProgressBarComponent', () => {
  let component: BillProgressBarComponent;
  let fixture: ComponentFixture<BillProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillProgressBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
