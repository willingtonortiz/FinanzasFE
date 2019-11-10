import { Component, OnInit } from "@angular/core";
import { CreatedBillService } from "src/app/core/services/bill";
import { Bill } from "src/app/shared/models";
import { ModalContainerService } from "../../services";
import { Router } from "@angular/router";

@Component({
	selector: "app-created-bill-modal",
	templateUrl: "./created-bill-modal.component.html",
	styleUrls: ["./created-bill-modal.component.scss"]
})
export class CreatedBillModalComponent implements OnInit {
	constructor(
		private _createdBillService: CreatedBillService,
		private _modalContainerService: ModalContainerService,
		private _router: Router
	) {}

	ngOnInit() {}

	public billDetails() {
		const bill: Bill = this._createdBillService.billValue;
		this._router.navigate(["/bill/bill-detail", bill.id]);
		this._modalContainerService.closeModal();
	}

	public closeModal() {
		this._modalContainerService.closeModal();
	}
}
