import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Bill } from "src/app/shared/models";
import { BillService } from "src/app/core/http";
import { ModalContainerService } from "src/app/modules/nav-page/services";
import { ModalValue } from "src/app/modules/nav-page/enums";
import { SelectedBillService } from "src/app/core/services/bill";
import { BillStatus } from "src/app/shared/enums";

@Component({
	selector: "app-bill-detail",
	templateUrl: "./bill-detail.component.html",
	styleUrls: ["./bill-detail.component.scss"]
})
export class BillDetailComponent implements OnInit {
	public bill: Bill;
	public isExpired: boolean;
	public isNotCreated: boolean;

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _billService: BillService,
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
	}

	public async loadBill() {
		const billIdString: string = this._activatedRoute.snapshot.paramMap.get(
			"id"
		);
		const billId = parseInt(billIdString);

		try {
			this.bill = await this._billService.findById(billId);
			this.checkExpired();
			this.checkNotCreated();
		} catch (error) {
			console.log(error);
		}
	}

	public checkExpired(): void {
		if (this.bill.status === BillStatus.EXPIRED) {
			this.isExpired = true;
		}
	}

	public checkNotCreated(): void {
		if (this.bill.status === BillStatus.NOT_CREATED) {
			this.isNotCreated = true;
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
