import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { DiscountPool } from "src/app/shared/models";

@Component({
	selector: "app-discounted-pool-item",
	templateUrl: "./discounted-pool-item.component.html",
	styleUrls: ["./discounted-pool-item.component.scss"]
})
export class DiscountedPoolItemComponent implements OnInit {
	@Input() discountPool: DiscountPool;

	constructor() {}

	ngOnInit() {}
}
