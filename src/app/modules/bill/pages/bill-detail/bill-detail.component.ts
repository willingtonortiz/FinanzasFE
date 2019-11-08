import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Location } from "@angular/common";

import { Bill } from "src/app/shared/models";
import { BillService } from "src/app/core/http";

@Component({
	selector: "app-bill-detail",
	templateUrl: "./bill-detail.component.html",
	styleUrls: ["./bill-detail.component.scss"]
})
export class BillDetailComponent implements OnInit {
	public bill: Bill;

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _location: Location,
		private _billService: BillService,
		private _router: Router
	) {
		this.bill = {
			startDate: new Date(),
			endDate: new Date()
		};
	}

	public async ngOnInit() {
		this.loadBill();
	}

	public async loadBill() {
		const billIdString: string = this._activatedRoute.snapshot.paramMap.get(
			"id"
		);
		const billId = parseInt(billIdString);

		try {
			this.bill = await this._billService.findById(billId);
		} catch (error) {
			console.log(error);
		}
	}

	goBack() {
		this._location.back();
	}

	public async deleteBill(): Promise<void> {
		try {
			const deletedBill: Bill = await this._billService.deleteById(
				this.bill.id
			);
			this._router.navigate(["home"]);
		} catch (error) {
			console.log("ERROR EN BILL DETAIL COMPONENT");
		}
	}
}
