import { Component, OnInit } from "@angular/core";
import {
	FormGroup,
	FormBuilder,
	Validators,
	AbstractControl
} from "@angular/forms";
import { Location } from "@angular/common";

import { AuthenticationService } from "src/app/core/authentication";
import { BillService } from "src/app/core/http";
import { BillType, BillStatus } from "src/app/shared/enums";
import { CreateBill } from "src/app/shared/dtos/output";
import { UserCredentials } from "src/app/shared/dtos";

@Component({
	selector: "app-add-bill",
	templateUrl: "./add-bill.component.html",
	styleUrls: ["./add-bill.component.scss"]
})
export class AddBillComponent implements OnInit {
	private currentUser: UserCredentials;
	public billForm: FormGroup;
	public billType: number;
	public message: string;

	constructor(
		private _formBuilder: FormBuilder,
		private _authenticationService: AuthenticationService,
		private _billService: BillService,
		private _location: Location
	) {
		this.billType = BillType.TO_PAY;
		this.currentUser = this._authenticationService.currentUserValue;
	}

	ngOnInit() {
		const today = this.getTodaysDateString();

		this.billForm = this._formBuilder.group({
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
	}

	public async onSubmit() {
		if (this.billForm.invalid) {
			this.markFieldsAsDirty();
			return;
		}

		const formValue = this.billForm.value;

		// TODO: Validar el tipo de letra a crear
		// TODO: Validar que las fechas sean correctas

		const newBill: CreateBill = {
			drawerRuc: formValue.drawerRuc,
			draweeRuc: formValue.draweeRuc,
			amount: parseFloat(formValue.amount),
			startDate: formValue.startDate,
			endDate: formValue.endDate,
			currencyCode: formValue.currencyCode,
			status: BillStatus.VALID,
			type: BillType.TO_PAY,
			pymeId: this.currentUser.id,
			signPlace: formValue.signPlace,
			paymentPlace: formValue.paymentPlace
		};

		try {
			await this._billService.create(newBill);

			this.resetFields();

			this.message = "Se ha creado la letra correctamente";

			setTimeout(() => {
				this.message = "";
			}, 4000);
		} catch (error) {
			console.log(error);
		}
	}

	public markFieldsAsDirty(): void {
		this.drawerRuc.markAsDirty();
		this.draweeRuc.markAsDirty();
		this.signPlace.markAsDirty();
		this.paymentPlace.markAsDirty();
		this.amount.markAsDirty();
	}

	public resetFields(): void {
		this.drawerRuc.reset();
		this.draweeRuc.reset();
		const today: string = this.getTodaysDateString();
		this.startDate.setValue(today);
		this.endDate.setValue(today);
		this.signPlace.reset();
		this.paymentPlace.reset();
		this.currencyType.setValue(1);
		this.amount.markAsDirty();
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
		this._location.back();
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
