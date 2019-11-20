import { Component, OnInit } from "@angular/core";
import { SelectedBillService } from "src/app/core/services/bill";
import { ModalContainerService } from "../../services";
import { Router } from "@angular/router";
import { Bill, Record } from "src/app/shared/models";
import { BillService } from "src/app/core/http";
import { BillListService } from "src/app/core/services/bill/bill-list/bill-list.service";
import { AuthenticationService } from 'src/app/core/authentication';
import { UserCredentials } from 'src/app/shared/dtos';
import { RecordService } from 'src/app/core/http/record/record.service';

@Component({
	selector: "app-delete-bill-modal",
	templateUrl: "./delete-bill-modal.component.html",
	styleUrls: ["./delete-bill-modal.component.scss"]
})
export class DeleteBillModalComponent implements OnInit {
	public bill: Bill;
	private currentUser: UserCredentials;

	constructor(
		private _selectedBillService: SelectedBillService,
		private _modalContainerService: ModalContainerService,
		private _router: Router,
		private _billListService: BillListService,
		private _authenticationService: AuthenticationService,
		private _recordService: RecordService
	) {
		this.bill = this._selectedBillService.billValue;
		this.currentUser = this._authenticationService.currentUserValue;
	}

	ngOnInit() { }

	public async deleteBill() {
		const today = new Date();

		let message = "Se elimino una letra por ";

		if (this.bill.type == 1)
			message += "pagar al ruc " + this.bill.drawerRuc;
		else message += "cobrar al ruc " + this.bill.draweeRuc;

		message += ", por el monto de " + this.bill.amount;

		if (this.bill.currencyCode == 1) message += " soles.";
		else message += " dolares.";

		const newRecord: Record = {
			userId: this.currentUser.id,
			message: message,
			date: today
		};

		try {
			await this._billListService.deleteById(this.bill.id);
			await this._recordService.createRecord(newRecord);
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
