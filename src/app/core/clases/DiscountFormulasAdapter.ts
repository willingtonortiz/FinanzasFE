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
		const discountValues: Array<number> = discounts.map((x: Discount) => {
			return x.discount;
		});
		const tepValues: Array<number> = discounts.map((x: Discount) => {
			return x.tep;
		});
		const nominalValues: Array<number> = discounts.map((x: Discount) => {
			return x.bill.amount;
		});

		const averageDays = DiscountFormulas.averageDays(
			netValues,
			discountValues,
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
		// console.log(date);
		// console.log(bill.endDate);
		const discountDays = DiscountFormulas.daysBetween(date, bill.endDate);
		// console.log(`Días de descuento: ${discountDays}`);

		const tedays = DiscountFormulas.computeEfectiveRate(discountDays, rate);
		// console.log(`TE Periodo de descuento: ${tedays}`);

		const discountRate: number = DiscountFormulas.discountRate(tedays);
		// console.log(`Tasa de descuento: ${discountRate}`);

		let discount: number = DiscountFormulas.discount(
			bill.amount,
			discountRate
		);
		discount = Number(discount.toFixed(2));
		// console.log(`Descuento de 13 días: ${discount}`);

		const initialCostTotal: number = initialCosts.reduce((accu, curr) => {
			return accu + curr.amount;
		}, 0);
		// console.log(`Costo inicial total: ${initialCostTotal}`);

		const finalCostTotal: number = finalCosts.reduce((accu, curr) => {
			return accu + curr.amount;
		}, 0);
		// console.log(`Costo final total: ${finalCostTotal}`);

		let netValue: number = DiscountFormulas.netValue(
			bill.amount,
			discountRate
		);
		netValue = Number(netValue.toFixed(2));

		// console.log(`Valor neto: ${netValue}`);

		const receivedValue: number = DiscountFormulas.receivedValue(
			bill.amount - discount,
			0,
			initialCostTotal
		);
		// console.log(`Valor recibido: ${receivedValue}`);

		const deliveredValue: number = DiscountFormulas.deliveredValue(
			bill.amount,
			0,
			finalCostTotal
		);
		// console.log(`Valor entregado: ${deliveredValue}`);

		const tcea: number = DiscountFormulas.billTcea(
			deliveredValue,
			receivedValue,
			discountDays
		);
		// console.log(`TCEA: ${tcea}`);

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
