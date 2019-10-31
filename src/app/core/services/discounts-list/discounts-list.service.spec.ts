import { TestBed } from "@angular/core/testing";

import { DiscountsListService } from "./discounts-list.service";

describe("DiscountsListService", () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it("should be created", () => {
		const service: DiscountsListService = TestBed.get(DiscountsListService);
		expect(service).toBeTruthy();
	});
});
