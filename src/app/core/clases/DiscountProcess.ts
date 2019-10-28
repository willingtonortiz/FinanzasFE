import { DiscountHelper } from "./DiscountHelper";
import {
	Rate,
	DiscountPool,
	Discount,
	Bill,
	Cost
} from "src/app/shared/models";

export class DiscountProcess {
	// private utilService: UtilService;
	private discountDate: Date;
	private rate: Rate;
	private discountPool: DiscountPool;

	public constructor() {
		// this.utilService = new UtilService();
		this.discountPool = {
			discounts: new Array<Discount>()
		};
	}

	public discountBill(
		bill: Bill,
		initialCosts: Array<Cost>,
		finalCosts: Array<Cost>
	) {
		let rate = this.rate.rateValue;
		console.log(`TEA: ${rate}`);

		const discountDays = DiscountHelper.daysBetween(
			this.discountDate,
			bill.endDate
		);
		console.log(`Días de descuento: ${discountDays}`);

		const tedays = DiscountHelper.computeEfectiveRate(
			discountDays,
			this.rate
		);
		console.log(`TE Periodo de descuento: ${tedays}`);

		const discountRate: number = DiscountHelper.discountRate(tedays);
		console.log(`Tasa de descuento: ${discountRate}`);

		const discount: number = DiscountHelper.discount(
			bill.amount,
			discountRate
		);
		console.log(`Descuento de 13 días: ${discount}`);

		const initialCostTotal: number = initialCosts.reduce((accu, curr) => {
			return accu + curr.amount;
		}, 0);
		console.log(`Costo inicial total: ${initialCostTotal}`);

		const finalCostTotal: number = finalCosts.reduce((accu, curr) => {
			return accu + curr.amount;
		}, 0);
		console.log(`Costo final total: ${finalCostTotal}`);

		const netValue: number = DiscountHelper.netValue(
			bill.amount,
			discountRate
		);
		console.log(`Valor neto: ${netValue}`);

		const receivedValue: number = DiscountHelper.receivedValue(
			bill.amount - discount,
			0,
			initialCostTotal
		);
		console.log(`Valor recibido: ${receivedValue}`);

		const deliveredValue: number = DiscountHelper.deliveredValue(
			bill.amount,
			0,
			finalCostTotal
		);
		console.log(`Valor entregado: ${deliveredValue}`);

		const tcea: number = DiscountHelper.billTcea(
			deliveredValue,
			receivedValue,
			discountDays
		);
		console.log(`TCEA: ${tcea}`);

		// 233.7103667%
		// 233.70885681122706
	}

	get Rate(): Rate {
		return this.rate;
	}
	set Rate(rate: Rate) {
		this.rate = rate;
	}

	get DiscountDate(): Date {
		return this.discountDate;
	}
	set DiscountDate(discountDate: Date) {
		this.discountDate = discountDate;
	}
}
