import { BillAmountPipe } from "./bill-amount.pipe";

describe("BillAmountPipe", () => {
	it("create an instance", () => {
		const pipe = new BillAmountPipe();
		expect(pipe).toBeTruthy();
	});
});
