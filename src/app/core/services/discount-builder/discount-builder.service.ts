import { Injectable } from "@angular/core";
import { DiscountBillService } from "../discount-bill/discount-bill.service";
import { DiscountBillCostsService } from "../discount-bill-costs/discount-bill-costs.service";
import { Bill, Cost } from "src/app/shared/models";
import { CreateDiscountPool } from "src/app/shared/dtos/output";
import { BillStatus } from "src/app/shared/enums";

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
			type: currentBill.type,
			currencyCode: currentBill.currencyCode,
			draweeRuc: currentBill.draweeRuc,
			drawerRuc: currentBill.drawerRuc,
			startDate: currentBill.startDate,
			endDate: currentBill.endDate,
			status: BillStatus.VALID
		};
	}

	public buildCreateDiscountPool(): CreateDiscountPool {
		return null;
	}
}
