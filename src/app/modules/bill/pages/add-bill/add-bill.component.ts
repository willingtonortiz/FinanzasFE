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
import { DateUtilsService } from "src/app/core/services";
import { DateValidatorsService } from "src/app/shared/validators";
import { Pyme, Bill } from "src/app/shared/models";
import { CreatedBillService } from "src/app/core/services/bill";
import { ModalContainerService } from "src/app/modules/nav-page/services";
import { ModalValue } from "src/app/modules/nav-page/enums";
import { BillListService } from "src/app/core/services/bill/bill-list/bill-list.service";

@Component({
	selector: "app-add-bill",
	templateUrl: "./add-bill.component.html",
	styleUrls: ["./add-bill.component.scss"]
})
// TODO: Reducir la complejidad de este componente
// Tiene muchas responsabilidades
export class AddBillComponent implements OnInit {
	private currentUser: UserCredentials;
	public currentPyme: Pyme;
	public billForm: FormGroup;
	public billType: number;
	public dateError: boolean;

	constructor(
		private _formBuilder: FormBuilder,
		private _authenticationService: AuthenticationService,
		private _billService: BillService,
		private _location: Location,
		private _dateUtilsService: DateUtilsService,
		private _dateValidatorsService: DateValidatorsService,
		private _createdBillService: CreatedBillService,
		private _modalContainerService: ModalContainerService,
		private _billListService: BillListService
	) {
		this.dateError = false;
		this.currentUser = this._authenticationService.currentUserValue;
	}

	public async ngOnInit() {
		this.loadForm();
		this.loadPyme();
	}

	public loadForm(): void {
		const today = this._dateUtilsService.getCalendarTodaysString();
		// Creación del formulario
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
			startDate: [
				today,
				[
					Validators.required
					// this._dateValidatorsService.beforeDate(
					// 	this._dateUtilsService.getTodaysDate()
					// )
				]
			],
			endDate: [
				today,
				[
					Validators.required
					// this._dateValidatorsService.afterDate(
					// 	this._dateUtilsService.getTodaysDate()
					// )
				]
			],
			signPlace: ["", [Validators.required]],
			paymentPlace: ["", [Validators.required]],
			currencyCode: ["1", [Validators.required]],
			amount: [
				"",
				[Validators.required, Validators.pattern(/^\d+\.?\d*$/)]
			]
		});
	}

	public async loadPyme(): Promise<void> {
		try {
			this.currentPyme = await this._authenticationService.getCurrentPyme();
		} catch (error) {
			this.currentPyme = null;
		}

		this.changeBillToPay();
	}

	public async onSubmit() {
		if (this.billForm.invalid) {
			this.markFieldsAsDirty();
			return;
		}

		const currencyCode = parseInt(this.currencyCode.value);

		const newBill: CreateBill = {
			drawerRuc: this.drawerRuc.value,
			draweeRuc: this.draweeRuc.value,
			amount: parseFloat(this.amount.value),
			startDate: this.startDate.value,
			endDate: this.endDate.value,
			currencyCode: currencyCode,
			status: BillStatus.VALID,
			type: this.billType,
			paymentPlace: this.paymentPlace.value,
			signPlace: this.signPlace.value,
			pymeId: this.currentUser.id
		};

		try {
			const createdBill: Bill = await this._billService.create(newBill);

			this.resetFields();

			this._createdBillService.setBill(createdBill);
			this._modalContainerService.openModalWithId(
				ModalValue.CREATED_BILL
			);
			await this._billListService.fetchBills();
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
		const today: string = this._dateUtilsService.getCalendarTodaysString();
		this.drawerRuc.reset();
		this.draweeRuc.reset();
		// this.changeBillToPay();
		if (this.billType === BillType.TO_PAY) {
			this.drawerRuc.setValue("");
			this.draweeRuc.setValue(this.currentPyme.ruc);
		} else {
			this.drawerRuc.setValue(this.currentPyme.ruc);
			this.draweeRuc.setValue("");
		}
		this.startDate.setValue(today);
		this.endDate.setValue(today);
		this.signPlace.reset();
		this.paymentPlace.reset();
		// this.currencyCode.setValue("1");
		this.amount.reset();
	}

	public changeBillToPay(): void {
		let previousDrawee: string = this.draweeRuc.value;
		if (previousDrawee === this.currentPyme.ruc) {
			previousDrawee = "";
		}

		this.billType = BillType.TO_PAY;

		this.drawerRuc.setValue(previousDrawee);
		this.draweeRuc.setValue(this.currentPyme.ruc);
	}

	public changeBillToCharge(): void {
		let previousDrawer: string = this.drawerRuc.value;
		if (previousDrawer === this.currentPyme.ruc) {
			previousDrawer = "";
		}
		this.billType = BillType.TO_CHARGE;
		this.drawerRuc.setValue(this.currentPyme.ruc);
		this.draweeRuc.setValue(previousDrawer);
	}

	// TODO, preguntar a la profe si es posible registrar letras que aún
	// No han sido creadas
	// No han sido emitidas

	public checkDateBill(): void {
		const start: number = new Date(this.startDate.value).getTime();
		const end: number = new Date(this.endDate.value).getTime();

		if (start > end) {
			this.dateError = true;
		} else {
			this.dateError = false;
		}
	}

	public goBack() {
		this._location.back();
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

	public get currencyCode(): AbstractControl {
		return this.billForm.get("currencyCode");
	}

	public get amount(): AbstractControl {
		return this.billForm.get("amount");
	}
}
