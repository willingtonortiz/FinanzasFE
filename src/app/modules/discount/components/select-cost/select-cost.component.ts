import { Component, OnInit } from "@angular/core";
import { Bill, CostType } from "src/app/shared/models";
import { DiscountService, SelectBillService } from "src/app/core/services";

@Component({
	selector: "app-select-cost",
	templateUrl: "./select-cost.component.html",
	styleUrls: ["./select-cost.component.scss"]
})
export class SelectCostComponent implements OnInit {
	public bill: Bill;

	public initialCosts: Array<any>;
	public finalCosts: Array<any>;

	public initialReason: string;
	public initialValueType: string;
	public initialValue: string;
	public initialTotal: number;

	public finalReason: string;
	public finalValueType: string;
	public finalValue: string;
	public finalTotal: number;

	constructor(
		private discountService: DiscountService,
		private selectBillService: SelectBillService
	) {
		this.bill = this.discountService.CurrentBill;
		this.initialCosts = [];
		this.finalCosts = [];
		this.initialTotal = 0;
		this.finalTotal = 0;
	}

	ngOnInit() {}

	public addInitialCost(): void {
		const value: number = parseFloat(this.initialValue);

		this.discountService.addInitialCost({
			reason: this.initialReason,
			costType: CostType.Inicial,
			valueType: this.initialValueType,
			amount: value
		});

		this.initialCosts.push({
			reason: this.initialReason,
			valueType: this.initialValueType,
			value: this.initialValue
		});

		this.initialTotal += value;
	}

	public addFinalCost(): void {
		const value: number = parseFloat(this.finalValue);

		this.discountService.addFinalCost({
			reason: this.initialReason,
			costType: CostType.Final,
			valueType: this.initialValueType,
			amount: value
		});

		this.finalCosts.push({
			reason: this.finalReason,
			valueType: this.finalValueType,
			value: this.finalValue
		});

		this.finalTotal += value;
	}

	public addBill() {
		this.selectBillService.hide();
		this.selectBillService.setPage(1);
		this.discountService.confirmDiscount();
		console.log("Letra agregada");
	}
}
