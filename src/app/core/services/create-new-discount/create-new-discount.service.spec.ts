import { TestBed } from "@angular/core/testing";

import { CreateNewDiscountService } from "./create-new-discount.service";

describe("CreateNewDiscountService", () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it("should be created", () => {
		const service: CreateNewDiscountService = TestBed.get(
			CreateNewDiscountService
		);
		expect(service).toBeTruthy();
	});
});
