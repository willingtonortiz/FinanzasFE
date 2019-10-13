import { Component, OnInit } from "@angular/core";
import { DiscountService } from "src/app/_services";
import {
	Rate,
	CurrencyType,
	RateType,
	RateTerm,
	DiscountPool
} from "src/app/_models";

@Component({
	selector: "app-discount-container",
	templateUrl: "./discount-container.component.html",
	styleUrls: ["./discount-container.component.scss"]
})
export class DiscountContainerComponent implements OnInit {
	public rate: Rate;
	public discountDate: string;
	public discountPool: DiscountPool;

	constructor(private discountService: DiscountService) {
		const today = new Date();
		this.discountDate = `${today.getFullYear()}-${today.getMonth() +
			1}-${today.getDate()}`;

		this.rate = {
			businessName: "Empresa S.A.C.",
			currency: CurrencyType.Dolares,
			rateTerm: RateTerm.Anual,
			rateType: RateType.Efectiva,
			rateValue: 0.123456
		};

		this.discountPool = {
			deliveredValue: 10000,
			receivedValue: 9000,
			tcea: 0.25
		};
	}

	showData() {
		// console.log(this.discountDate);
	}

	ngOnInit() {}
}
