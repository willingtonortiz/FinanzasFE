import { Component, OnInit, Input } from "@angular/core";
import { Discount } from "src/app/shared/models";

@Component({
	selector: "app-discounted-bill",
	templateUrl: "./discounted-bill.component.html",
	styleUrls: ["./discounted-bill.component.scss"]
})
export class DiscountedBillComponent implements OnInit {
	@Input() discount: Discount;

	constructor() {}

	ngOnInit() {}
}
