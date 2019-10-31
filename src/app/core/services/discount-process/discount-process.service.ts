import { Injectable } from "@angular/core";
import { Discount, Bill, Cost } from "src/app/shared/models";
import { DiscountHelper } from "src/app/core/clases";
import { DiscountPoolRateService } from "../discount-pool-rate/discount-pool-rate.service";
import { CreateNewDiscountService } from "../create-new-discount/create-new-discount.service";
import { DiscountBillService } from "../discount-bill/discount-bill.service";
import { DiscountBillCostsService } from "../discount-bill-costs/discount-bill-costs.service";

@Injectable({
	providedIn: "root"
})
// Maneja el descuento de la cartera de letras
export class DiscountProcessService {
	private _discountDate: Date;

	public constructor(
		private _createNewDiscountService: CreateNewDiscountService,
		private _discountPoolRateService: DiscountPoolRateService,
		private _discountBillService: DiscountBillService,
		private _discountBillCosts: DiscountBillCostsService
	) {}

	public async discountCurrentBill() {
		const rate = this._discountPoolRateService.rateValue;
		const bill = this._discountBillService.billValue;
		const initialCosts = this._discountBillCosts.initialCostsValue;
		const finalCosts = this._discountBillCosts.finalCostsValue;
		// console.log(`TEA: ${rate}`);

		const discountDays = DiscountHelper.daysBetween(
			this._discountDate,
			bill.endDate
		);
		// console.log(`Días de descuento: ${discountDays}`);

		const tedays = DiscountHelper.computeEfectiveRate(discountDays, rate);
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

		this._createNewDiscountService.setDiscount(newDiscount);
	}

	public saveChanges(): void {}
}
