import { TestBed } from "@angular/core/testing";

import { DiscountedDiscountPoolService } from "./discounted-discount-pool.service";

describe("DiscountedDiscountPoolService", () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it("should be created", () => {
		const service: DiscountedDiscountPoolService = TestBed.get(
			DiscountedDiscountPoolService
		);
		expect(service).toBeTruthy();
	});
});
