import { Component, OnInit } from "@angular/core";
import {
	FormGroup,
	FormBuilder,
	Validators,
	AbstractControl
} from "@angular/forms";
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
	private currentUser: User;
	public billForm: FormGroup;
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
		const today = this.getTodaysDateString();

		this.billForm = this.formBuilder.group({
			drawerRuc: [
				"",
				[
					Validators.required,
					Validators.minLength(11),
					Validators.maxLength(11),
					Validators.pattern(/20\d{9}/)
				]
			],
			draweeRuc: [
				"",
				[
					Validators.required,
					Validators.minLength(11),
					Validators.maxLength(11),
					Validators.pattern(/20\d{9}/)
				]
			],
			startDate: [today, [Validators.required]],
			endDate: [today, [Validators.required]],
			signPlace: ["", [Validators.required]],
			paymentPlace: ["", [Validators.required]],
			currencyType: [1, [Validators.required]],
			amount: [
				"",
				[Validators.required, Validators.pattern(/^\d+\.?\d*$/)]
			]
		});

		console.log(this.startDate.value);
	}

	public test() {
		console.log(new Date(this.startDate.value).toLocaleDateString());
	}

	public async onSubmit() {
		if (this.billForm.invalid) {
			// Object.keys(this.billForm.controls).forEach(x => {
			// 	const control = this.billForm.get(x);
			// 	console.log(x, control.errors);
			// });
			return;
		}

		const newBill: Bill = this.billForm.value;
		newBill.billType = this.billType;

		// try {
		// 	await this.billService.create(newBill);
		// } catch (error) {
		// 	console.log(error);
		// }
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

	public getTodaysDateString(): string {
		let date = new Date(Date.now());
		let year: number = date.getFullYear();
		let month: number | string = date.getMonth() + 1;
		let day: number | string = date.getDate();

		month = month < 10 ? `0${month}` : month;
		day = day < 10 ? `0${day}` : day;

		let today: string = `${year}-${month}-${day}`;

		return today;
	}

	public get drawerRuc(): AbstractControl {
		return this.billForm.get("drawerRuc");
	}

	public get draweeRuc(): AbstractControl {
		return this.billForm.get("draweeRuc");
	}

	public get startDate(): AbstractControl {
		return this.billForm.get("startDate");
	}

	public get endDate(): AbstractControl {
		return this.billForm.get("endDate");
	}

	public get signPlace(): AbstractControl {
		return this.billForm.get("signPlace");
	}

	public get paymentPlace(): AbstractControl {
		return this.billForm.get("paymentPlace");
	}

	public get currencyType(): AbstractControl {
		return this.billForm.get("currencyType");
	}

	public get amount(): AbstractControl {
		return this.billForm.get("amount");
	}
}
