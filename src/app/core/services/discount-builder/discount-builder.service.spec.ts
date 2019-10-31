import { TestBed } from '@angular/core/testing';

import { DiscountBuilderService } from './discount-builder.service';

describe('DiscountBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiscountBuilderService = TestBed.get(DiscountBuilderService);
    expect(service).toBeTruthy();
  });
});
