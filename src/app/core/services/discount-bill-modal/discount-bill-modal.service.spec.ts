import { TestBed } from "@angular/core/testing";

import { DiscountBillModalService } from "./discount-bill-modal.service";

describe("DiscountBillModalService", () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it("should be created", () => {
		const service: DiscountBillModalService = TestBed.get(
			DiscountBillModalService
		);
		expect(service).toBeTruthy();
	});
});
