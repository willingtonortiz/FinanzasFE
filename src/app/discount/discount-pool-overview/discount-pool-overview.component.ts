import { Component, OnInit, OnDestroy } from "@angular/core";
import { DiscountProcessService } from "src/app/_services";
import { DiscountPool } from "src/app/_models";
import { Observable, Subscription } from "rxjs";

@Component({
	selector: "app-discount-pool-overview",
	templateUrl: "./discount-pool-overview.component.html",
	styleUrls: ["./discount-pool-overview.component.scss"]
})
export class DiscountPoolOverviewComponent implements OnInit, OnDestroy {
	private discountPollSuscription: Subscription;
	public discountPool: DiscountPool;

	constructor(private discountProcessService: DiscountProcessService) {}

	ngOnInit() {
		this.discountPollSuscription = this.discountProcessService.DiscountPoolObservable.subscribe(
			{
				next: (discountPool: DiscountPool) => {
					this.discountPool = discountPool;
				},
				error: (error: any) => {
					console.log(error);
				}
			}
		);
	}

	ngOnDestroy() {
		this.discountPollSuscription.unsubscribe();
	}
}
