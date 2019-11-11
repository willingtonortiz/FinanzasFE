import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Bill } from "src/app/shared/models";
import { BillService } from "src/app/core/http";
import { DateUtilsService } from "src/app/core/services";
import { ModalContainerService } from "src/app/modules/nav-page/services";
import { ModalValue } from "src/app/modules/nav-page/enums";
import { SelectedBillService } from "src/app/core/services/bill";

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
		private _router: Router,
		private _billService: BillService,
		private _dateUtilsService: DateUtilsService,
		private _modalContainerService: ModalContainerService,
		private _selectedBillService: SelectedBillService
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
		this._router.navigate(["home"]);
	}

	public async deleteBill(): Promise<void> {
		this._selectedBillService.setBill(this.bill);
		this._modalContainerService.openModalWithId(ModalValue.SELECTED_BILL);
	}
}
