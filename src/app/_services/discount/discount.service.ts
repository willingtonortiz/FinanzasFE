import { Injectable } from "@angular/core";
import { Rate, DiscountPool, Bill } from "src/app/_models";

@Injectable({
	providedIn: "root"
})
export class DiscountService {
	private rate: Rate;
	private discountPool: DiscountPool;
	private currentBill: Bill;
	private bills: Bill[];

	constructor() {
		this.bills = new Array<Bill>();
	}

	get Rate(): Rate {
		return this.rate;
	}

	set Rate(rate: Rate) {
		this.rate = rate;
		console.log(rate);
	}

	// Para la cartera de letras
	get DiscountPool(): DiscountPool {
		return this.discountPool;
	}

	set DiscountPool(discountPool: DiscountPool) {
		this.discountPool = discountPool;
	}

	// Para la letra actual
	get CurrentBill() {
		return this.currentBill;
	}

	set CurrentBill(bill: Bill) {
		this.currentBill = bill;
	}

	// Para todas las letras
	get Bills(): Bill[] {
		return this.bills;
	}

	public addBill(bill: Bill): void {
		this.bills.push(bill);
	}

	public restartBills(): void {
		this.bills = new Array<Bill>();
	}

	public showData() {
		console.log(this.Rate);
		console.log(this.DiscountPool);
		console.log(this.Bills);
	}
}
