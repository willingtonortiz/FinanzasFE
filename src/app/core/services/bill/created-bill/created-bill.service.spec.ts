import { TestBed } from "@angular/core/testing";

import { CreatedBillService } from "./created-bill.service";

describe("CreatedBillService", () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it("should be created", () => {
		const service: CreatedBillService = TestBed.get(CreatedBillService);
		expect(service).toBeTruthy();
	});
});
