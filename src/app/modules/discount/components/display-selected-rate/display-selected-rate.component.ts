import { Component, OnInit, OnDestroy } from "@angular/core";
import { Rate } from "src/app/shared/models";
import {
	DiscountBillModalService,
	DiscountPoolRateService,
	DiscountPoolDataService,
	DiscountDateService,
	DateUtilsService
} from "src/app/core/services";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { RateTerm, CurrencyCode, RateType } from "src/app/shared/enums";

@Component({
	selector: "app-display-selected-rate",
	templateUrl: "./display-selected-rate.component.html",
	styleUrls: ["./display-selected-rate.component.scss"]
})
export class DisplaySelectedRateComponent implements OnInit, OnDestroy {
	public rate: Rate;
	public discountDate: string;
	private _suscriptions: Array<Subscription>;

	constructor(
		private _discountBillModalService: DiscountBillModalService,
		private _discountPoolRate: DiscountPoolRateService,
		private _discountPoolData: DiscountPoolDataService,
		private _discountDateService: DiscountDateService,
		private _dateUtilsService: DateUtilsService,
		private _router: Router
	) { }

	public async ngOnInit() {
		// this.rate = {
		// 	businessName: "TEMPORAL[BORRAR]",
		// 	rateValue: 0.12,
		// 	capitalizationTerm: RateTerm.ANNUAL,
		// 	currencyCode: CurrencyCode.PEN,
		// 	rateTerm: RateTerm.ANNUAL,
		// 	rateType: RateType.EFFECTIVE
		// };
		this._suscriptions = new Array<Subscription>();

		// Descomentar para producción

		// if (this._discountPoolRate.rateValue === null) {
		// 	await this._router.navigate(["/rate"]);
		// 	return;
		// }

		this.discountDate = this._dateUtilsService.getCalendarTodaysString();

		this._suscriptions.push(
			this._discountPoolRate.rateObservable.subscribe({
				next: (rate: Rate) => {
					this.rate = rate;
					if (rate === null) {
						this._router.navigate(["/rate"]);
						return;
					}

				},
				error: error => {
					console.log("Error en display-selected-rate.component");
				}
			})
		);
	}

	public updateDiscountDate() {

		if (this.validateDate() && !this.afterMaximumDate() && !this.beforeMinimumDate()) {
			this._discountDateService.setDiscountDate(
				new Date(this.discountDate + "T00:00:00")
			);
		}
	}

	private validateDate(): boolean {
		let date = new Date(this.discountDate + "T00:00:00");
		//console.log(this._discountPoolData.maximumDiscountDateValue);
		return (date.getTime() == date.getTime())
	}

	private afterMaximumDate(): boolean {
		let date = new Date(this.discountDate + "T00:00:00");
		return date > this._discountPoolData.maximumDiscountDateValue;
	}

	private beforeMinimumDate(): boolean {
		let date = new Date(this.discountDate + "T00:00:00");
		return date < this._discountPoolData.minimumDiscountDateValue;
	}

	public showModal() {
		if (this.validateDate() && !this.afterMaximumDate() && !this.beforeMinimumDate())
			this._discountBillModalService.show();
	}

	public ngOnDestroy() {
		this._suscriptions.forEach(x => x.unsubscribe());
	}
}
