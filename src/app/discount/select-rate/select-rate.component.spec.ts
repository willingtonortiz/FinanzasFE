import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRateComponent } from './select-rate.component';

describe('SelectRateComponent', () => {
  let component: SelectRateComponent;
  let fixture: ComponentFixture<SelectRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
