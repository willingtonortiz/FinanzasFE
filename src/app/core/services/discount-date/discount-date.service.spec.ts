import { TestBed } from "@angular/core/testing";

import { DiscountDateService } from "./discount-date.service";

describe("DiscountDateService", () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it("should be created", () => {
		const service: DiscountDateService = TestBed.get(DiscountDateService);
		expect(service).toBeTruthy();
	});
});
