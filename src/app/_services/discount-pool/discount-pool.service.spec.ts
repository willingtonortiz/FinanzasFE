import { TestBed } from "@angular/core/testing";

import { DiscountPoolService } from "./discount-pool.service";

describe("DiscountPoolService", () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it("should be created", () => {
		const service: DiscountPoolService = TestBed.get(DiscountPoolService);
		expect(service).toBeTruthy();
	});
});
