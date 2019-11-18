import { Component, OnInit, Input } from "@angular/core";
import { Cost } from "src/app/shared/models";
import { CostReasonService } from "../../services";
import { DiscountBillCostsService } from "src/app/core/services";

@Component({
	selector: "app-cost-item",
	templateUrl: "./cost-item.component.html",
	styleUrls: ["./cost-item.component.scss"]
})
export class CostItemComponent implements OnInit {
	@Input() cost: Cost;

	constructor(
		private _costReasonService: CostReasonService,
		private _discountBillCostService: DiscountBillCostsService
	) {
		this.cost = {};
	}

	ngOnInit() {}

	public deleteCost() {
		this._costReasonService.setCostReason(this.cost);
		this._discountBillCostService.deleteCost(this.cost);
	}
}
