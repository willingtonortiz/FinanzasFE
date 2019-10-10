import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayBankComponent } from './display-bank.component';

describe('DisplayBankComponent', () => {
  let component: DisplayBankComponent;
  let fixture: ComponentFixture<DisplayBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
