import { TestBed } from "@angular/core/testing";

import { DiscountBillCostsService } from "./discount-bill-costs.service";

describe("DiscountBillCostsService", () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it("should be created", () => {
		const service: DiscountBillCostsService = TestBed.get(
			DiscountBillCostsService
		);
		expect(service).toBeTruthy();
	});
});
