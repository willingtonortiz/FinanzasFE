import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankGroupComponent } from './bank-group.component';

describe('BankGroupComponent', () => {
  let component: BankGroupComponent;
  let fixture: ComponentFixture<BankGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
