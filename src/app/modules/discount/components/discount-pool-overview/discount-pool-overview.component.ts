import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { DiscountPool } from "src/app/shared/models";
import {
	DiscountProcessService,
	DiscountPoolDataService
} from "src/app/core/services";
import { DiscountPoolService } from "src/app/core/http";

@Component({
	selector: "app-discount-pool-overview",
	templateUrl: "./discount-pool-overview.component.html",
	styleUrls: ["./discount-pool-overview.component.scss"]
})
export class DiscountPoolOverviewComponent implements OnInit, OnDestroy {
	private _suscriptions: Array<Subscription>;
	public discountPool: DiscountPool;

	constructor(
		private discountProcessService: DiscountProcessService,
		private _discountPoolData: DiscountPoolDataService
	) {}

	public ngOnInit() {
		this.discountPool = {};
		this._suscriptions = new Array<Subscription>();

		this._suscriptions.push(
			this._discountPoolData.discountPoolObservable.subscribe({
				next: (discountPool: DiscountPool) => {
					this.discountPool = discountPool;
				},
				error: (error: any) => {
					console.log(error);
				}
			})
		);
	}

	public ngOnDestroy() {
		this._suscriptions.forEach(x => x.unsubscribe());
	}

	public onSubmit() {
		try {
			this.discountProcessService.saveDiscountPool();
		} catch (error) {
			console.log(
				"ERROR => DISCOUNT POOL OVERVIEW COMPONENT => ONSUBMIT"
			);
		}
	}
}
