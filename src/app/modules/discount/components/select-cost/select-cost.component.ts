import { Component, OnInit } from "@angular/core";
import { Bill, Cost } from "src/app/shared/models";
import {
	DiscountBillModalService,
	DiscountBillService,
	DiscountProcessService,
	DiscountBillCostsService
} from "src/app/core/services";
import { CostType } from "src/app/shared/enums";
import {
	FormGroup,
	FormBuilder,
	AbstractControl,
	Validators
} from "@angular/forms";

@Component({
	selector: "app-select-cost",
	templateUrl: "./select-cost.component.html",
	styleUrls: ["./select-cost.component.scss"]
})
export class SelectCostComponent implements OnInit {
	public bill: Bill;
	public initialCosts: Array<Cost>;
	public finalCosts: Array<Cost>;
	public initialCostForm: FormGroup;
	public finalCostForm: FormGroup;

	public initialTotal: number;

	public finalTotal: number;

	constructor(
		private _discountProcessService: DiscountProcessService,
		private _discountBillModalService: DiscountBillModalService,
		private _discountBillService: DiscountBillService,
		private _discountBillCostsService: DiscountBillCostsService,
		private _formBuilder: FormBuilder
	) {}

	public ngOnInit() {
		this.initialCostForm = this._formBuilder.group({
			initialReason: ["Portes iniciales", []],
			initialPaymentType: ["1", []],
			initialValue: [
				"",
				[Validators.required, Validators.pattern(/^\d+\.?\d*$/)]
			]
		});

		this.finalCostForm = this._formBuilder.group({
			finalReason: ["Portes finales", []],
			finalPaymentType: ["1", []],
			finalValue: [
				"",
				[Validators.required, Validators.pattern(/^\d+\.?\d*$/)]
			]
		});

		this.bill = this._discountBillService.billValue;
		this.initialCosts = new Array<Cost>();
		this.finalCosts = new Array<Cost>();
		this.initialTotal = 0;
		this.finalTotal = 0;
	}

	public addInitialCost(): void {
		if (this.initialCostForm.invalid) {
			this.markFieldsAsDirty();
			return;
		}

		const value: number = parseFloat(this.initialValue.value) / 100;
		const paymentType: number = parseFloat(this.initialPaymentType.value);

		this._discountBillCostsService.addInitialCost({
			reason: this.initialReason.value,
			costType: CostType.INITIAL,
			paymentType: paymentType,
			amount: value
		});

		this.initialCosts = this._discountBillCostsService.initialCostsValue;
		this.initialTotal = this._discountBillCostsService.initialCostTotal;
	}

	public addFinalCost(): void {
		if (this.finalCostForm.invalid) {
			// console.log("Es invalido");
			this.markFieldsAsDirty();
			return;
		}

		const value: number = parseFloat(this.finalValue.value) / 100;
		const paymentType: number = parseInt(this.initialPaymentType.value);

		this._discountBillCostsService.addFinalCost({
			reason: this.finalReason.value,
			costType: CostType.FINAL,
			paymentType: paymentType,
			amount: value
		});

		this.finalCosts = this._discountBillCostsService.finalCostsValue;
		this.finalTotal = this._discountBillCostsService.finalCostTotal;
	}

	public addBill() {
		this._discountBillModalService.hide();
		this._discountBillModalService.setPage(1);
		this._discountProcessService.discountCurrentBill();
	}

	public markFieldsAsDirty() {
		this.initialValue.markAsDirty();
		this.finalValue.markAsDirty();
	}

	public get initialReason(): AbstractControl {
		return this.initialCostForm.get("initialReason");
	}

	public get initialPaymentType(): AbstractControl {
		return this.initialCostForm.get("initialPaymentType");
	}

	public get initialValue(): AbstractControl {
		return this.initialCostForm.get("initialValue");
	}

	public get finalReason(): AbstractControl {
		return this.finalCostForm.get("finalReason");
	}

	public get finalPaymentType(): AbstractControl {
		return this.finalCostForm.get("finalPaymentType");
	}

	public get finalValue(): AbstractControl {
		return this.finalCostForm.get("finalValue");
	}
}
