import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoBillsFoundComponent } from './no-bills-found.component';

describe('NoBillsFoundComponent', () => {
  let component: NoBillsFoundComponent;
  let fixture: ComponentFixture<NoBillsFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoBillsFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoBillsFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
