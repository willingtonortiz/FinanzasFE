import { Injectable } from "@angular/core";
import { Discount } from "src/app/_models/discount";

@Injectable({
	providedIn: "root"
})
export class DiscountService {
	private discount: Discount;

	constructor() {}

	get Discount() {
		return this.discount;
	}

	set Discount(discount: Discount) {
		this.discount = discount;
		console.log(discount);
	}
}
