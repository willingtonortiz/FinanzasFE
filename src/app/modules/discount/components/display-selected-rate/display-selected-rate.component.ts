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
	) {
		this.rate = { businessName: "", rateValue: 0 };
	}

	public async ngOnInit() {
		this._suscriptions = new Array<Subscription>();

		// Quitar para pruebas
		if (this._discountPoolRate.rateValue === null) {
			await this._router.navigate(["/rate"]);
			return;
		}

		this.discountDate = this._dateUtilsService.getCalendarTodaysString();

		this._suscriptions.push(
			this._discountPoolRate.rateObservable.subscribe({
				next: (rate: Rate) => {
					this.rate = rate;
				},
				error: error => {
					console.log("Error en display-selected-rate.component");
				}
			})
		);
	}

	public updateDiscountDate() {
		this._discountDateService.setDiscountDate(
			new Date(this.discountDate + "T00:00:00")
		);
	}

	public showModal() {
		this._discountBillModalService.show();
	}

	public ngOnDestroy() {
		this._suscriptions.forEach(x => x.unsubscribe());
	}
}
