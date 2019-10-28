import { Component, OnInit, OnDestroy } from "@angular/core";
import { DiscountProcessService, DiscountPoolService } from "src/app/_services";
import { DiscountPool } from "src/app/_models";
import { Subscription } from "rxjs";

@Component({
	selector: "app-discount-pool-overview",
	templateUrl: "./discount-pool-overview.component.html",
	styleUrls: ["./discount-pool-overview.component.scss"]
})
export class DiscountPoolOverviewComponent implements OnInit, OnDestroy {
	private discountPoolSuscription: Subscription;
	public discountPool: DiscountPool;

	constructor(
		private discountProcessService: DiscountProcessService,
		private discountPoolService: DiscountPoolService
	) {}

	public ngOnInit() {
		this.discountPoolSuscription = this.discountProcessService.DiscountPoolObservable.subscribe(
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

	public ngOnDestroy() {
		this.discountPoolSuscription.unsubscribe();
	}

	public onSubmit() {
		this.discountPoolService.createDiscountPool(this.discountPool);
		console.log(this.discountPool);
	}
}
