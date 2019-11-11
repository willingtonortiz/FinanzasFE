import { TestBed } from '@angular/core/testing';

import { SelectedBillService } from './selected-bill.service';

describe('SelectedBillService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectedBillService = TestBed.get(SelectedBillService);
    expect(service).toBeTruthy();
  });
});
