import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

import { Bill } from "src/app/shared/models";
import { BillService } from "src/app/core/http";
import { DateUtilsService } from "src/app/core/services";

@Component({
	selector: "app-bill-detail",
	templateUrl: "./bill-detail.component.html",
	styleUrls: ["./bill-detail.component.scss"]
})
export class BillDetailComponent implements OnInit {
	public bill: Bill;
	public isExpired: boolean;

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _location: Location,
		private _billService: BillService,
		private _router: Router,
		private _dateUtilsService: DateUtilsService
	) {
		this.bill = {
			startDate: new Date(),
			endDate: new Date()
		};
	}

	public async ngOnInit() {
		await this.loadBill();
		this.loadStatus();
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

	public loadStatus(): void {
		// const start: number = this.bill.startDate.getTime();
		const end: number = this.bill.endDate.getTime();
		// console.log(this._dateUtilsService.getTodaysDate());
		const today: number = this._dateUtilsService.getTodaysDate().getTime();

		if (end < today) {
			this.isExpired = true;
			return;
		}
	}

	goBack() {
		this._location.back();
	}

	// Mostrar un modal de confirmación
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
