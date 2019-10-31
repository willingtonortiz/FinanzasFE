import { Component, OnInit } from "@angular/core";
import { Bill, Cost } from "src/app/shared/models";
import {
	DiscountBillModalService,
	DiscountBillService,
	DiscountProcessService
} from "src/app/core/services";

@Component({
	selector: "app-select-cost",
	templateUrl: "./select-cost.component.html",
	styleUrls: ["./select-cost.component.scss"]
})
export class SelectCostComponent implements OnInit {
	public bill: Bill;

	public initialCosts: Array<Cost>;
	public finalCosts: Array<Cost>;

	// Para un costo inicial
	public initialReason: string;
	public initialValueType: string;
	public initialValue: string;
	public initialTotal: number;

	// Para un costo final
	public finalReason: string;
	public finalValueType: string;
	public finalValue: string;
	public finalTotal: number;

	constructor(
		private _discountProcessService: DiscountProcessService,
		private _discountBillModalService: DiscountBillModalService,
		private _discountBillService: DiscountBillService
	) {
		this.bill = this._discountBillService.billValue;
		this.initialCosts = new Array<Cost>();
		this.finalCosts = new Array<Cost>();
		this.initialTotal = 0;
		this.finalTotal = 0;
	}

	ngOnInit() {}

	public addInitialCost(): void {
		// const value: number = parseFloat(this.initialValue);
		// this.discountService.addInitialCost({
		// 	reason: this.initialReason,
		// 	costType: CostType.Inicial,
		// 	valueType: this.initialValueType,
		// 	amount: value
		// });
		// this.initialCosts.push({
		// 	reason: this.initialReason,
		// 	valueType: this.initialValueType,
		// 	value: this.initialValue
		// });
		// this.initialTotal += value;
	}

	public addFinalCost(): void {
		// const value: number = parseFloat(this.finalValue);
		// this.discountService.addFinalCost({
		// 	reason: this.initialReason,
		// 	costType: CostType.Final,
		// 	valueType: this.initialValueType,
		// 	amount: value
		// });
		// this.finalCosts.push({
		// 	reason: this.finalReason,
		// 	valueType: this.finalValueType,
		// 	value: this.finalValue
		// });
		// this.finalTotal += value;
	}

	public addBill() {
		this._discountBillModalService.hide();
		this._discountBillModalService.setPage(1);
		// this._discountProcessService.discountCurrentBill();
	}
}
