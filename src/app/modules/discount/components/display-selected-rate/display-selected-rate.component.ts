import { Component, OnInit, OnDestroy } from "@angular/core";
import { Rate } from "src/app/shared/models";
import {
	DiscountBillModalService,
	DiscountPoolRateService,
	DiscountPoolDataService,
	DiscountDateService
} from "src/app/core/services";
import { Subscription } from "rxjs";

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
		private _discountDateService: DiscountDateService
	) {}

	ngOnInit() {
		this._suscriptions = new Array<Subscription>();
		// const today = new Date();
		// this.discountDate = `${today.getFullYear()}-${today.getMonth() +
		// 	1}-${today.getDate()}`;

		const currentDate = this._discountDateService.discountDateValue;

		// this.discountDate = `${currentDate.getFullYear()}-${currentDate.getMonth() +
		// 	1}-${currentDate.getDate()}`;

		const month: string =
			currentDate.getMonth() + 1 > 9
				? `${currentDate.getMonth() + 1}`
				: `0${currentDate.getMonth()}`;

		const day: string =
			currentDate.getDate() > 9
				? `${currentDate.getDate()}`
				: `0${currentDate.getDate()}`;

		this.discountDate = `${currentDate.getFullYear()}-${month}-${day}`;

		console.log(this.discountDate);
		// this.discountDate = currentDate;

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
