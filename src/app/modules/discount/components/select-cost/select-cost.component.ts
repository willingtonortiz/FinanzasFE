import { Component, OnInit } from "@angular/core";
import { Bill, Cost } from "src/app/shared/models";
import {
	DiscountBillModalService,
	DiscountBillService,
	DiscountProcessService,
	DiscountBillCostsService
} from "src/app/core/services";
import { CostType, PaymentType } from "src/app/shared/enums";

@Component({
	selector: "app-select-cost",
	templateUrl: "./select-cost.component.html",
	styleUrls: ["./select-cost.component.scss"]
})
export class SelectCostComponent implements OnInit {
	public bill: Bill;
	public initialCosts: Array<Cost>;
	public finalCosts: Array<Cost>;

	// TODO, AGREGAR VALIDACIÓN DE CAMPOS
	// Para un costo inicial
	public initialReason: string;
	public initialPaymentType: PaymentType;
	public initialValue: string;
	public initialTotal: number;

	// Para un costo final
	public finalReason: string;
	public finalPaymentType: PaymentType;
	public finalValue: string;
	public finalTotal: number;

	constructor(
		private _discountProcessService: DiscountProcessService,
		private _discountBillModalService: DiscountBillModalService,
		private _discountBillService: DiscountBillService,
		private _discountBillCostsService: DiscountBillCostsService
	) {
		this.bill = this._discountBillService.billValue;
		this.initialCosts = new Array<Cost>();
		this.finalCosts = new Array<Cost>();
		this.initialTotal = 0;
		this.finalTotal = 0;
	}

	ngOnInit() {}

	public addInitialCost(): void {
		const value: number = parseFloat(this.initialValue);

		this._discountBillCostsService.addInitialCost({
			reason: this.initialReason,
			costType: CostType.INITIAL,
			paymentType: this.initialPaymentType,
			amount: value
		});

		this.initialCosts = this._discountBillCostsService.initialCostsValue;
		this.initialTotal = this._discountBillCostsService.initialCostTotal;
	}

	public addFinalCost(): void {
		const value: number = parseFloat(this.finalValue);

		this._discountBillCostsService.addFinalCost({
			reason: this.finalReason,
			costType: CostType.FINAL,
			paymentType: this.finalPaymentType,
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
}
