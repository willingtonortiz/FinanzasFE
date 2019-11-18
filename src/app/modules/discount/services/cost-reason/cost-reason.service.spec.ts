import { TestBed } from "@angular/core/testing";

import { CostReasonService } from "./cost-reason.service";

describe("CostReasonService", () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it("should be created", () => {
		const service: CostReasonService = TestBed.get(CostReasonService);
		expect(service).toBeTruthy();
	});
});
