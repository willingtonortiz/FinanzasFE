import { Injectable } from "@angular/core";
import {
	Rate,
	Bill,
	Cost,
	CurrencyType,
	RateTerm,
	RateType,
} from "src/app/_models";
import { DiscountProcessService } from "../discount-process/discount-process.service";

@Injectable({
	providedIn: "root"
})
export class DiscountService {
	private discountDate: Date;
	private currentBill: Bill;
	private initialCosts: Array<Cost>;
	private finalCosts: Array<Cost>;

	constructor(private discountProcessService: DiscountProcessService) {
		this.cleanBill();

		const today: Date = new Date(Date.now());

		this.discountDate = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate()
		);
		this.discountProcessService.DiscountDate = this.discountDate;

		this.discountProcessService.Rate = {
			businessName: "EMPRESA S.A.C.",
			currency: CurrencyType.Soles,
			rateTerm: RateTerm.Anual,
			rateValue: 0.1,
			rateType: RateType.Efectiva
		};

		this.currentBill = {
			startDate: new Date(Date.now()),
			endDate: new Date(2019, 9, 31),
			amount: 10000
		};
	}

	public cleanBill() {
		this.initialCosts = new Array<Cost>();
		this.finalCosts = new Array<Cost>();
	}

	public addInitialCost(cost: Cost) {
		this.initialCosts.push(cost);
	}

	public addFinalCost(cost: Cost) {
		this.finalCosts.push(cost);
	}

	public confirmDiscount() {
		this.discountProcessService.discountBill(
			this.currentBill,
			this.initialCosts,
			this.finalCosts
		);
		this.cleanBill();
	}

	/* GETTERS AND SETTERS */
	get Rate(): Rate {
		return this.discountProcessService.Rate;
	}
	set Rate(rate: Rate) {
		this.discountProcessService.Rate = rate;
	}

	// Para la letra actual
	get CurrentBill() {
		return this.currentBill;
	}
	set CurrentBill(bill: Bill) {
		this.currentBill = bill;
	}
}
