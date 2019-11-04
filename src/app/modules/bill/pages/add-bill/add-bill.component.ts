import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Location } from "@angular/common";

import { User, Bill } from "src/app/shared/models";
import { AuthenticationService } from "src/app/core/authentication";
import { BillService } from "src/app/core/http";
import { BillType } from "src/app/shared/enums";

@Component({
	selector: "app-add-bill",
	templateUrl: "./add-bill.component.html",
	styleUrls: ["./add-bill.component.scss"]
})
export class AddBillComponent implements OnInit {
	public billForm: FormGroup;
	private currentUser: User;
	public billType: number;

	constructor(
		private formBuilder: FormBuilder,
		private authenticationService: AuthenticationService,
		private billService: BillService,
		private location: Location
	) {
		this.billType = BillType.TO_PAY;
		this.currentUser = authenticationService.currentUserValue;
	}

	ngOnInit() {
		this.billForm = this.formBuilder.group({
			startDate: ["", Validators.compose([Validators.required])],
			endDate: ["", Validators.compose([Validators.required])],
			currency: ["", Validators.compose([Validators.required])],
			amount: ["", Validators.compose([Validators.required])],
			drawerRuc: ["", Validators.compose([Validators.required])],
			draweeRuc: ["", Validators.compose([Validators.required])]
		});
	}

	public async onSubmit() {
		if (this.billForm.invalid) {
			return;
		}

		const newBill: Bill = this.billForm.value;
		newBill.billType = this.billType;

		try {
			await this.billService.create(newBill);
		} catch (error) {
			console.log(error);
		}
	}

	public changeBillType(option: BillType): void {
		switch (option) {
			case BillType.TO_PAY:
				{
					this.billForm.controls["drawerRuc"].setValue("");
					this.billForm.controls["draweeRuc"].setValue("20123456789");
				}
				break;

			default:
				{
					this.billForm.controls["drawerRuc"].setValue("20123456789");
					this.billForm.controls["draweeRuc"].setValue("");
				}
				break;
		}

		if (this.billType !== option) {
			this.billType = option;
		}
	}

	public goBack() {
		this.location.back();
	}
}
