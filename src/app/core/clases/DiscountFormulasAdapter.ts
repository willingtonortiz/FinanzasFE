import {
	Discount,
	Rate,
	Bill,
	Cost,
	DiscountPool
} from "src/app/shared/models";
import { DiscountFormulas } from "./DiscountFormulas";

export class DiscountFormulasAdapter {
	public static discountPoolTcea(
		discountPool: DiscountPool,
		discounts: Array<Discount>
	): number {
		const netValues: Array<number> = discounts.map((x: Discount) => {
			return x.netValue;
		});
		const discountDaysValues: Array<number> = discounts.map((x: Discount) => {
			return x.discountDays;
		});
		const tepValues: Array<number> = discounts.map((x: Discount) => {
			return x.tep;
		});
		const nominalValues: Array<number> = discounts.map((x: Discount) => {
			return x.bill.amount;
		});

		const averageDays = DiscountFormulas.averageDays(
			netValues,
			discountDaysValues,
			tepValues,
			nominalValues,
			discounts.length
		);

		const discountPoolTcea = DiscountFormulas.discountPoolTcea(
			discountPool.receivedValue,
			discountPool.deliveredValue,
			averageDays,
			discounts.length
		);
		return discountPoolTcea;
	}

	public static discountBill(
		rate: Rate,
		bill: Bill,
		initialCosts: Array<Cost>,
		finalCosts: Array<Cost>,
		date: Date
	): Discount {
		const discountDays = DiscountFormulas.daysBetween(date, bill.endDate);

		const tedays = DiscountFormulas.computeEfectiveRate(discountDays, rate);

		const discountRate: number = DiscountFormulas.discountRate(tedays);

		let discount: number = DiscountFormulas.discount(
			bill.amount,
			discountRate
		);
		discount = Number(discount.toFixed(2));

		const initialCostTotal: number = initialCosts.reduce((accu, curr) => {
			return accu + curr.amount;
		}, 0);

		const finalCostTotal: number = finalCosts.reduce((accu, curr) => {
			return accu + curr.amount;
		}, 0);

		let netValue: number = DiscountFormulas.netValue(
			bill.amount,
			discountRate
		);
		netValue = Number(netValue.toFixed(2));

		const receivedValue: number = DiscountFormulas.receivedValue(
			bill.amount - discount,
			0,
			initialCostTotal
		);

		const deliveredValue: number = DiscountFormulas.deliveredValue(
			bill.amount,
			0,
			finalCostTotal
		);

		const tcea: number = DiscountFormulas.billTcea(
			deliveredValue,
			receivedValue,
			discountDays
		);

		const newDiscount: Discount = {
			bill: bill,
			tep: tedays,
			discount: discount,
			discountDays: discountDays,
			deliveredValue: deliveredValue,
			receivedValue: receivedValue,
			discountRate: discountRate,
			netValue: netValue,
			retention: 0,
			tcea: tcea,
			initialCost: initialCostTotal,
			finalCost: finalCostTotal,
			costs: [...initialCosts, ...finalCosts]
		};

		return newDiscount;
	}
}
