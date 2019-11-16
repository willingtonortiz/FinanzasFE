import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DiscountPoolInput } from "src/app/shared/dtos/input/DiscountPoolInput";
import { DiscountedDiscountPoolService } from "../../services";

@Component({
	selector: "app-discount-overview-container",
	templateUrl: "./discount-overview-container.component.html",
	styleUrls: ["./discount-overview-container.component.scss"]
})
export class DiscountOverviewContainerComponent implements OnInit {
	public discountPool: DiscountPoolInput;

	constructor(
		private _route: ActivatedRoute,
		private _discountedDiscountPoolService: DiscountedDiscountPoolService
	) {
		this.discountPool = {
			deliveredValue: 0,
			receivedValue: 0,
			tcea: 0,
			discounts: []
		};
	}

	async ngOnInit() {
		const discountPoolId = parseInt(
			this._route.snapshot.paramMap.get("id")
		);

		try {
			await this._discountedDiscountPoolService.fetchById(discountPoolId);
			this.discountPool = this._discountedDiscountPoolService.discountPoolValue;
			} catch (error) {
			console.log(
				"ERROR => DISCOUNT OVERVIEW CONTAINER COMPONENT => NGONINIT"
			);
		}
	}
}
