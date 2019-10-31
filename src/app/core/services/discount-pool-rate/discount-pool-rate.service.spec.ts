import { TestBed } from "@angular/core/testing";

import { DiscountPoolRateService } from "./discount-pool-rate.service";

describe("DiscountPoolRateService", () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it("should be created", () => {
		const service: DiscountPoolRateService = TestBed.get(
			DiscountPoolRateService
		);
		expect(service).toBeTruthy();
	});
});
