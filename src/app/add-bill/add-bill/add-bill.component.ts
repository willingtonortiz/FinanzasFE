import { Component, OnInit } from "@angular/core";
import { User, Bill, BillType } from "src/app/_models";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService, BillService } from "src/app/_services";
import { BillDto } from "src/app/_dtos";

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
		private billService: BillService
	) {
		this.billType = BillType.ToPay;
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

	public onSubmit() {
		if (this.billForm.invalid) {
			return;
		}

		const newBill: Bill = this.billForm.value;
		newBill.billType = this.billType;

		this.billService.create(newBill).subscribe({
			next: (bill: Bill) => {
				console.log(bill);
			},
			error: (error: any) => {
				console.log(error);
			}
		});
	}

	public changeBillType(option: BillType): void {
		switch (option) {
			case BillType.ToPay:
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
}
