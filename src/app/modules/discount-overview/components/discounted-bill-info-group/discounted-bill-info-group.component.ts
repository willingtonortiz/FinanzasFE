import { Component, OnInit, Input } from "@angular/core";
import { Discount } from "src/app/shared/models";
import { DiscountInput } from 'src/app/shared/dtos/input/DiscountInput';

@Component({
	selector: "app-discounted-bill-info-group",
	templateUrl: "./discounted-bill-info-group.component.html",
	styleUrls: ["./discounted-bill-info-group.component.scss"]
})
export class DiscountedBillInfoGroupComponent implements OnInit {
	@Input() discountedBills: DiscountInput[];

	constructor() {}

	ngOnInit() {}
}
