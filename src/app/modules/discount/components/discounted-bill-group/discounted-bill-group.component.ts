import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Discount, DiscountPool } from "src/app/shared/models";
import { DiscountsListService } from "src/app/core/services";

@Component({
	selector: "app-discounted-bill-group",
	templateUrl: "./discounted-bill-group.component.html",
	styleUrls: ["./discounted-bill-group.component.scss"]
})
export class DiscountedBillGroupComponent implements OnInit, OnDestroy {
	private _suscriptions: Array<Subscription>;
	public discounts: Array<Discount>;

	constructor(private _discountsList: DiscountsListService) {
		this._suscriptions = new Array<Subscription>();
	}

	ngOnInit() {
		this._suscriptions.push(
			this._discountsList.discountsObservable.subscribe({
				next: (discounts: Array<Discount>) => {
					this.discounts = discounts;
					console.log(this.discounts);
				},
				error: (error: any) => {
					console.log("Error en DiscountedBillGroupComponent", error);
				}
			})
		);
	}

	ngOnDestroy() {
		this._suscriptions.forEach(x => x.unsubscribe());
	}
}
