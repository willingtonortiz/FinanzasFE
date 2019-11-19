import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { DiscountPool, Record } from "src/app/shared/models";
import {
	DiscountProcessService,
	DiscountPoolDataService,
	DiscountsListService
} from "src/app/core/services";
import { BillListService } from "src/app/core/services/bill/bill-list/bill-list.service";
import { RecordService } from 'src/app/core/http/record/record.service';
import { UserCredentials } from 'src/app/shared/dtos';
import { AuthenticationService } from 'src/app/core/authentication';

@Component({
	selector: "app-discount-pool-overview",
	templateUrl: "./discount-pool-overview.component.html",
	styleUrls: ["./discount-pool-overview.component.scss"]
})
export class DiscountPoolOverviewComponent implements OnInit, OnDestroy {
	private _suscriptions: Array<Subscription>;
	public discountPool: DiscountPool;
	public submitted: boolean;
	private currentUser: UserCredentials;
	constructor(
		private discountProcessService: DiscountProcessService,
		private _discountPoolData: DiscountPoolDataService,
		private _billListService: BillListService,
		private _discountsList: DiscountsListService,
		private _recordService: RecordService,
		private _authenticationService: AuthenticationService
	) {
		this.currentUser = this._authenticationService.currentUserValue;
	}

	public ngOnInit() {
		this.discountPool = {};
		this._suscriptions = new Array<Subscription>();
		this.submitted = false;

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

	public async onSubmit() {
		this.submitted = true;
		const today = new Date();

		const newRecord: Record = {
			userId: this.currentUser.id,
			message: "Se creo un descuento de letras ",
			date: today
		}

		if (this._discountsList.discountsValue.length > 0)
			try {
				await this.discountProcessService.saveDiscountPool();
				await this._recordService.createRecord(newRecord);
				// Actualizar las letras
				this._billListService.fetchBills();

				// Ver la cartera descontada
			} catch (error) {
				console.log(
					"ERROR => DISCOUNT POOL OVERVIEW COMPONENT => ONSUBMIT"
				);
			}
	}
}
