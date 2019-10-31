import { TestBed } from "@angular/core/testing";

import { DiscountPoolDataService } from "./discount-pool-data.service";

describe("DiscountPoolDataService", () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it("should be created", () => {
		const service: DiscountPoolDataService = TestBed.get(
			DiscountPoolDataService
		);
		expect(service).toBeTruthy();
	});
});
