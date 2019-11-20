import { Component, OnInit, OnDestroy } from "@angular/core";
import { Bill, Cost } from "src/app/shared/models";
import {
	DiscountBillModalService,
	DiscountProcessService,
	DiscountBillCostsService
} from "src/app/core/services";
import { CostType, PaymentType } from "src/app/shared/enums";
import {
	FormGroup,
	FormBuilder,
	AbstractControl,
	Validators
} from "@angular/forms";
import { DiscountBillService } from "src/app/core/services/discount-bill/discount-bill.service";
import { CostReasonService } from "../../services";
import { Subscription } from "rxjs";

@Component({
	selector: "app-select-cost",
	templateUrl: "./select-cost.component.html",
	styleUrls: ["./select-cost.component.scss"]
})
// TODO: Reducir la complejidad de esta clase, separar en más componentes => siguiente versión
export class SelectCostComponent implements OnInit, OnDestroy {
	private _suscriptions: Subscription[];
	public bill: Bill;
	public initialCosts: Cost[];
	public finalCosts: Cost[];

	public initialCostForm: FormGroup;
	public finalCostForm: FormGroup;
	public retentionForm: FormGroup;

	public initialTotal: number;
	public finalTotal: number;

	public initialCostOptions: string[];
	public finalCostOptions: string[];

	constructor(
		private _discountProcessService: DiscountProcessService,
		private _discountBillModalService: DiscountBillModalService,
		private _discountBillService: DiscountBillService,
		private _discountBillCostsService: DiscountBillCostsService,
		private _formBuilder: FormBuilder,
		private _costReasonService: CostReasonService
	) {
		this._suscriptions = [];
		this._suscriptions.push(
			this._costReasonService.costReasonObservable.subscribe({
				next: (cost: Cost) => {
					if (cost.costType === CostType.INITIAL) {
						this.initialCostOptions.push(cost.reason);
					} else {
						this.finalCostOptions.push(cost.reason);
					}
				}
			})
		);
		this._suscriptions.push(
			this._discountBillCostsService.initialCostsObservable.subscribe({
				next: (costs: Cost[]) => {
					this.initialCosts = costs;
					this.initialTotal = this._discountBillCostsService.initialCostTotal;
				}
			})
		);
		this._suscriptions.push(
			this._discountBillCostsService.finalCostsObservable.subscribe({
				next: (costs: Cost[]) => {
					this.finalCosts = costs;
					this.finalTotal = this._discountBillCostsService.finalCostTotal;
				}
			})
		);

		this.initialCostOptions = [
			"Portes",
			"Fotocopias",
			"Comisión de estudio",
			"Comisión de desembolso",
			"Comisión de intermediación",
			"Gastos de administración",
			"Gastos notariales",
			"Gastos registrales",
			"Seguro",
			"Otros gastos"
		];

		this.finalCostOptions = [
			"Portes",
			"Gastos de administración",
			"Otros gastos"
		];
	}

	public ngOnInit() {
		this.retentionForm = this._formBuilder.group({
			retention: [
				"0",
				[Validators.required, Validators.pattern(/^\d+\.?\d*$/)]
			]
		});

		this.initialCostForm = this._formBuilder.group({
			initialReason: ["Portes", [Validators.required]],
			initialPaymentType: ["1"],
			initialValue: [
				"",
				[
					Validators.min(0.0000001),
					Validators.required,
					Validators.pattern(/^\d+\.?\d*$/)
				]
			]
		});

		this.finalCostForm = this._formBuilder.group({
			finalReason: ["Portes", [Validators.required]],
			finalPaymentType: ["1"],
			finalValue: [
				"",
				[
					Validators.min(0.0000001),
					Validators.required,
					Validators.pattern(/^\d+\.?\d*$/)
				]
			]
		});

		this.bill = this._discountBillService.billValue;
		this.initialTotal = 0;
		this.finalTotal = 0;
	}

	public addInitialCost(): void {
		if (this.initialCostForm.invalid) {
			this.initialValue.markAsDirty();
			this.initialReason.markAsDirty();
			return;
		}

		const paymentType: number = parseFloat(this.initialPaymentType.value);
		let value: number = parseFloat(this.initialValue.value);

		if (paymentType === PaymentType.PERCENTAGE) {
			value /= 100;
		}

		this._discountBillCostsService.addInitialCost({
			reason: this.initialReason.value,
			costType: CostType.INITIAL,
			paymentType: paymentType,
			amount: value,
			currencyCode: this.bill.currencyCode
		});

		this.initialCostOptions = this.initialCostOptions.filter(
			x => x !== this.initialReason.value
		);
		this.restartInitialInputs();

		this.initialTotal = this._discountBillCostsService.initialCostTotal;
	}

	public restartInitialInputs() {
		this.initialReason.reset();
		this.initialValue.reset();
	}

	public changeInitialPaymentType(): void {
		const initialPaymentType = parseInt(this.initialPaymentType.value);
		this.initialValue.clearValidators();

		if (initialPaymentType === 1) {
			this.initialValue.setValidators([
				Validators.required,
				Validators.min(0.0000001),
				Validators.pattern(/^\d+\.?\d*$/)
			]);
		} else if (initialPaymentType === 2) {
			this.initialValue.setValidators([
				Validators.required,
				Validators.min(0.0000001),
				Validators.max(99.99999999),
				Validators.pattern(/^\d+\.?\d*$/)
			]);
		}
		this.initialValue.reset();
	}

	public addFinalCost(): void {
		if (this.finalCostForm.invalid) {
			this.finalValue.markAsDirty();
			this.finalReason.markAsDirty();
			return;
		}

		const paymentType: number = parseInt(this.finalPaymentType.value);
		let value: number = parseFloat(this.finalValue.value);

		if (paymentType === PaymentType.PERCENTAGE) {
			value /= 100;
		}

		this._discountBillCostsService.addFinalCost({
			reason: this.finalReason.value,
			costType: CostType.FINAL,
			paymentType: paymentType,
			amount: value,
			currencyCode: this.bill.currencyCode
		});

		this.finalCostOptions = this.finalCostOptions.filter(
			x => x !== this.finalReason.value
		);
		this.restartFinalInputs();

		this.finalTotal = this._discountBillCostsService.finalCostTotal;
	}

	public restartFinalInputs() {
		this.finalReason.reset();
		this.finalValue.reset();
	}

	public changeFinalPaymentType(): void {
		const finalPaymentType: number = parseInt(this.finalPaymentType.value);
		this.finalValue.clearValidators();

		if (finalPaymentType === 1) {
			this.finalValue.setValidators([
				Validators.required,
				Validators.min(0.0000001),
				Validators.pattern(/^\d+\.?\d*$/)
			]);
		} else if (finalPaymentType === 2) {
			this.finalValue.setValidators([
				Validators.required,
				Validators.min(0.0000001),
				Validators.max(99.99999999),
				Validators.pattern(/^\d+\.?\d*$/)
			]);
		}
		this.finalValue.reset();
	}

	/**
	 * Descuenta la letra
	 */
	public addBill() {

		if (this.retentionForm.invalid || !this.validate()) {
			return;
		}



		this._discountBillCostsService.setRetentionValue(
			parseFloat(this.retention.value)
		);

		this._discountBillModalService.restart();
		this._discountProcessService.discountCurrentBill();
		this._discountBillService.untrackBill();
	}

	public validateRetention(): Boolean {
		let r = parseFloat(this.retention.value);
		if (r < this.bill.amount)
			return true;
		return false;
	}

	public validate(): boolean {
		let r = parseFloat(this.retention.value);
		if (r + this.initialTotal < this.bill.amount)
			return true
		return false;
	}

	public get retention(): AbstractControl {
		return this.retentionForm.get("retention");
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

	public ngOnDestroy() {
		this._suscriptions.forEach(x => x.unsubscribe());
	}
}
