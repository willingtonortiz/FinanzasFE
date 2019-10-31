import { Injectable } from "@angular/core";
import { DiscountBillService } from "../discount-bill/discount-bill.service";
import { DiscountBillCostsService } from "../discount-bill-costs/discount-bill-costs.service";
import { Bill, Cost } from "src/app/shared/models";
import { CreateDiscountPool } from "src/app/shared/dtos/output";

@Injectable({
	providedIn: "root"
})
export class DiscountBuilderService {
	private discountDate: Date;

	public constructor(
		private discountBill: DiscountBillService,
		private discountBillCosts: DiscountBillCostsService
	) {}

	public buildBill(): Bill {
		const currentBill: Bill = this.discountBill.billValue;
		const initialCosts: Array<Cost> = this.discountBillCosts
			.initialCostsValue;
		const finalCosts: Array<Cost> = this.discountBillCosts.finalCostsValue;

		return {
			amount: currentBill.amount,
			billType: currentBill.billType,
			currency: currentBill.currency,
			draweeRuc: currentBill.draweeRuc,
			drawerRuc: currentBill.drawerRuc,
			startDate: currentBill.startDate,
			endDate: currentBill.endDate,
			initialCosts: initialCosts,
			finalCosts: finalCosts
		};
	}

	public buildCreateDiscountPool(): CreateDiscountPool {
		return null;
	}
}
