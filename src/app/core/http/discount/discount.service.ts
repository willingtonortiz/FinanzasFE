import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root"
})
// Modificar para se método https
export class DiscountService {
	// private discountBillBuilder: DiscountBillBuilder;

	constructor() {
		// const today: Date = new Date(Date.now());
		// this.discountDate = new Date(
		// 	today.getFullYear(),
		// 	today.getMonth(),
		// 	today.getDate()
		// );
		// this.discountProcessService.DiscountDate = this.discountDate;
		// this.discountProcessService.Rate = {
		// 	businessName: "EMPRESA S.A.C.",
		// 	currency: CurrencyType.Soles,
		// 	rateTerm: RateTerm.Anual,
		// 	rateValue: 0.1,
		// 	rateType: RateType.Efectiva
		// };
		// this.currentBill = {
		// 	startDate: new Date(Date.now()),
		// 	endDate: new Date(2019, 9, 31),
		// 	amount: 10000
		// };
	}

	/* GETTERS AND SETTERS */
	// get Rate(): Rate {
	// 	return this.discountProcessService.Rate;
	// }
	// set Rate(rate: Rate) {
	// 	this.discountProcessService.Rate = rate;
	// }
}
