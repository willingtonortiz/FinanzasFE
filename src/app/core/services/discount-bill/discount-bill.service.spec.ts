import { TestBed } from '@angular/core/testing';

import { DiscountBillService } from './discount-bill.service';

describe('DiscountBillService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiscountBillService = TestBed.get(DiscountBillService);
    expect(service).toBeTruthy();
  });
});
