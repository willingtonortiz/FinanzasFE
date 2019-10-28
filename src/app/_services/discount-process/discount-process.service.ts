import { Injectable } from "@angular/core";
import { Rate, DiscountPool, Discount, Bill, Cost } from "src/app/_models";
import { DiscountHelper } from "src/app/_clases";
import { BehaviorSubject, Observable, ObservedValueOf } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class DiscountProcessService {
	private discountPoolSubject: BehaviorSubject<DiscountPool>;
	private discountPoolObservable: Observable<DiscountPool>;

	private discountDate: Date;
	private rate: Rate;
	private discountPool: DiscountPool;

	public constructor() {
		this.discountPool = {
			receivedValue: 0,
			deliveredValue: 0,
			tcea: 0,
			discounts: new Array<Discount>()
		};
		this.discountPoolSubject = new BehaviorSubject<DiscountPool>(
			this.discountPool
		);
		this.discountPoolObservable = this.discountPoolSubject.asObservable();
	}

	public async discountBill(
		bill: Bill,
		initialCosts: Array<Cost>,
		finalCosts: Array<Cost>
	) {
		let rate = this.rate.rateValue;
		// console.log(`TEA: ${rate}`);

		const discountDays = DiscountHelper.daysBetween(
			this.discountDate,
			bill.endDate
		);
		// console.log(`Días de descuento: ${discountDays}`);

		const tedays = DiscountHelper.computeEfectiveRate(
			discountDays,
			this.rate
		);
		// console.log(`TE Periodo de descuento: ${tedays}`);

		const discountRate: number = DiscountHelper.discountRate(tedays);
		// console.log(`Tasa de descuento: ${discountRate}`);

		let discount: number = DiscountHelper.discount(
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

		let netValue: number = DiscountHelper.netValue(
			bill.amount,
			discountRate
		);
		netValue = Number(netValue.toFixed(2));

		// console.log(`Valor neto: ${netValue}`);

		const receivedValue: number = DiscountHelper.receivedValue(
			bill.amount - discount,
			0,
			initialCostTotal
		);
		// console.log(`Valor recibido: ${receivedValue}`);

		const deliveredValue: number = DiscountHelper.deliveredValue(
			bill.amount,
			0,
			finalCostTotal
		);
		// console.log(`Valor entregado: ${deliveredValue}`);

		const tcea: number = DiscountHelper.billTcea(
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

		this.addDiscount(newDiscount);
		// console.log(this.discountPool);
	}

	public addDiscount(discount: Discount): void {
		this.discountPool.discounts.push(discount);
		this.discountPool.receivedValue += discount.receivedValue;
		this.discountPool.deliveredValue += discount.deliveredValue;

		this.discountPoolSubject.next(this.discountPool);
	}

	public saveChanges(): void {

	}

	get DiscountPoolObservable(): Observable<DiscountPool> {
		return this.discountPoolObservable;
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
