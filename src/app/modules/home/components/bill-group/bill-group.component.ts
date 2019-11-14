import { Component, OnInit, OnDestroy } from "@angular/core";
import { Bill } from "src/app/shared/models";

import { BillListService } from "src/app/core/services/bill-list/bill-list.service";
import { Subscription } from "rxjs";

@Component({
	selector: "app-bill-group",
	templateUrl: "./bill-group.component.html",
	styleUrls: ["./bill-group.component.scss"]
})
export class BillGroupComponent implements OnInit, OnDestroy {
	public bills: Bill[];
	public option: number;
	private _suscriptions: Subscription[];

	constructor(private billListService: BillListService) {
		this.bills = [];
		this._suscriptions = [];
	}

	public async ngOnInit() {
		this.option = 1;

		this._suscriptions.push(
			this.billListService.getBillsToPay().subscribe(x => {
				this.bills = x;
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
				this.billListService.getBillsToPay().subscribe(x => {
					this.bills = x;
				})
			);
		} else if (option === 2) {
			this._suscriptions.push(
				this.billListService.getBillsToCharge().subscribe(x => {
					this.bills = x;
				})
			);
		} else {
			this._suscriptions.push(
				this.billListService.getDiscountedBills().subscribe(x => {
					this.bills = x;
				})
			);
		}
	}
}
