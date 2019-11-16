import { TestBed } from "@angular/core/testing";

import { DiscountedPoolListService } from "./discounted-pool-list.service";

describe("DiscountedPoolListService", () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it("should be created", () => {
		const service: DiscountedPoolListService = TestBed.get(
			DiscountedPoolListService
		);
		expect(service).toBeTruthy();
	});
});
