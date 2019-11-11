import { Component, OnInit, Input } from "@angular/core";

import { Bank, Rate } from "src/app/shared/models";
import { DiscountPoolRateService } from "src/app/core/services";
import { CurrencyCode, RateTerm, RateType } from "src/app/shared/enums";
import { Router } from "@angular/router";

@Component({
	selector: "app-display-bank",
	templateUrl: "./display-bank.component.html",
	styleUrls: ["./display-bank.component.scss"]
})
export class DisplayBankComponent implements OnInit {
	@Input() public bank: Bank;

	constructor(
		private discountPoolRateService: DiscountPoolRateService,
		private router: Router
	) {}

	ngOnInit() {}

	public selectSoles() {
		const rate: Rate = {
			businessName: this.bank.businessName,
			currencyCode: CurrencyCode.PEN,
			rateTerm: RateTerm.ANNUAL,
			rateType: RateType.EFFECTIVE,
			rateValue: this.bank.teaSoles,
			capitalizationTerm: null
		};
		this.discountPoolRateService.setRate(rate);
		this.router.navigate(["/discount"]);
	}

	public selectDolares() {
		const rate: Rate = {
			businessName: this.bank.businessName,
			currencyCode: CurrencyCode.USD,
			rateTerm: RateTerm.ANNUAL,
			rateType: RateType.EFFECTIVE,
			rateValue: this.bank.teaDolares,
			capitalizationTerm: null
		};
		this.discountPoolRateService.setRate(rate);
		this.router.navigate(["/discount"]);
	}
}
