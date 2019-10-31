import { Component, OnInit } from "@angular/core";
import { Rate, CurrencyType, RateTerm, RateType } from "src/app/shared/models";
import {
	DiscountBillModalService,
	DiscountPoolRateService
} from "src/app/core/services";

@Component({
	selector: "app-display-selected-rate",
	templateUrl: "./display-selected-rate.component.html",
	styleUrls: ["./display-selected-rate.component.scss"]
})
export class DisplaySelectedRateComponent implements OnInit {
	public rate: Rate;
	public discountDate: string;

	constructor(
		private _discountBillModalService: DiscountBillModalService,
		private _discountPoolRate: DiscountPoolRateService
	) {}

	ngOnInit() {
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
	}

	public showModal() {
		this._discountBillModalService.show();
	}
}
