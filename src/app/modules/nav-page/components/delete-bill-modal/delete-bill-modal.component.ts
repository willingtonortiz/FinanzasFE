import { Component, OnInit } from "@angular/core";
import { SelectedBillService } from "src/app/core/services/bill";
import { ModalContainerService } from "../../services";
import { Router } from "@angular/router";
import { Bill } from "src/app/shared/models";
import { BillService } from "src/app/core/http";
import { BillListService } from "src/app/core/services/bill/bill-list/bill-list.service";

@Component({
	selector: "app-delete-bill-modal",
	templateUrl: "./delete-bill-modal.component.html",
	styleUrls: ["./delete-bill-modal.component.scss"]
})
export class DeleteBillModalComponent implements OnInit {
	public bill: Bill;

	constructor(
		private _selectedBillService: SelectedBillService,
		private _modalContainerService: ModalContainerService,
		private _router: Router,
		private _billListService: BillListService
	) {
		this.bill = this._selectedBillService.billValue;
	}

	ngOnInit() {}

	public async deleteBill() {
		try {
			await this._billListService.deleteById(this.bill.id);
			this.closeModal();
			this._router.navigate(["home"]);
		} catch (error) {
			console.log("ERROR EN DELETE-MODAL-COMPONENT");
		}
	}

	public closeModal() {
		this._modalContainerService.closeModal();
	}
}
