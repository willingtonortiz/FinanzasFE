import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-select-cost",
	templateUrl: "./select-cost.component.html",
	styleUrls: ["./select-cost.component.scss"]
})
export class SelectCostComponent implements OnInit {
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

	constructor() {
		this.initialCosts = [];
		this.finalCosts = [];
		this.initialTotal = 0;
		this.finalTotal = 0;
	}

	ngOnInit() {}

	public addInitialCost(): void {
		this.initialCosts.push({
			reason: this.initialReason,
			valueType: this.initialValueType,
			value: this.initialValue
		});

		this.initialTotal += parseFloat(this.initialValue);
	}

	public addFinalCost(): void {
		this.finalCosts.push({
			reason: this.finalReason,
			valueType: this.finalValueType,
			value: this.finalValue
		});

		this.finalTotal += parseFloat(this.finalValue);
	}
}
