import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Discount, DiscountPool } from "src/app/shared/models";
import { DiscountProcessService } from "src/app/core/services";

@Component({
	selector: "app-discounted-bill-group",
	templateUrl: "./discounted-bill-group.component.html",
	styleUrls: ["./discounted-bill-group.component.scss"]
})
export class DiscountedBillGroupComponent implements OnInit, OnDestroy {
	private discountPoolSuscription: Subscription;
	public discounts: Array<Discount>;

	constructor(private discountProcessService: DiscountProcessService) {}

	ngOnInit() {
		this.discountPoolSuscription = this.discountProcessService.DiscountPoolObservable.subscribe(
			{
				next: (data: DiscountPool) => {
					this.discounts = data.discounts;
				},
				error: (error: any) => {
					console.log(error);
				}
			}
		);
	}

	ngOnDestroy() {
		this.discountPoolSuscription.unsubscribe();
	}
}
