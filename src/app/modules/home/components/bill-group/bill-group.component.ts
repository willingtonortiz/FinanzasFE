import { Component, OnInit, OnDestroy } from "@angular/core";
import { Bill, DiscountPool } from "src/app/shared/models";

import { BillListService } from "src/app/core/services/bill/bill-list/bill-list.service";
import { Subscription } from "rxjs";
import { DiscountedPoolListService } from "src/app/core/services";

@Component({
	selector: "app-bill-group",
	templateUrl: "./bill-group.component.html",
	styleUrls: ["./bill-group.component.scss"]
})
export class BillGroupComponent implements OnInit, OnDestroy {
	public discountPools: DiscountPool[];
	public bills: Bill[];
	public option: number;
	private _suscriptions: Subscription[];

	constructor(
		private _billListService: BillListService,
		private _discountedPoolListService: DiscountedPoolListService
	) {
		this.discountPools = [];
		this.bills = [];
		this._suscriptions = [];
	}

	public async ngOnInit() {
		this.option = 1;

		this._suscriptions.push(
			this._billListService.getBillsToPay().subscribe(x => {
				this.bills = x;
			})
		);

		this._suscriptions.push(
			this._discountedPoolListService
				.getDiscountedPools()
				.subscribe(x => {
					this.discountPools = x;
				})
		);
	}

	ngOnDestroy(): void {
		this._suscriptions.forEach(x => x.unsubscribe());
	}

	public async changeOption(option: number) {
		if (option === this.option) return;
		this.option = option;

		if (option === 1) {
			this._suscriptions.push(
				this._billListService.getBillsToPay().subscribe(x => {
					this.bills = x;
				})
			);
		} else if (option === 2) {
			this._suscriptions.push(
				this._billListService.getBillsToCharge().subscribe(x => {
					this.bills = x;
				})
			);
		} else {
			this._suscriptions.push(
				this._discountedPoolListService
					.getDiscountedPools()
					.subscribe(x => {
						this.bills = x;
					})
			);
		}
	}
}
