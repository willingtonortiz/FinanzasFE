import { TestBed } from "@angular/core/testing";

import { DiscountProcessService } from "./discount-process.service";

describe("DiscountProcessService", () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it("should be created", () => {
		const service: DiscountProcessService = TestBed.get(
			DiscountProcessService
		);
		expect(service).toBeTruthy();
	});
});
