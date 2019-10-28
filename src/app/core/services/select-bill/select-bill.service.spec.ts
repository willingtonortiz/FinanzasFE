import { TestBed } from '@angular/core/testing';

import { SelectBillService } from './select-bill.service';

describe('SelectBillService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectBillService = TestBed.get(SelectBillService);
    expect(service).toBeTruthy();
  });
});
