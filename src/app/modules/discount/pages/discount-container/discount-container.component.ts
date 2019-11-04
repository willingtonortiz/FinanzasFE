import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Rate, DiscountPool } from "src/app/shared/models";
import { DiscountService } from "src/app/core/http";
import { DiscountBillModalService } from "src/app/core/services";

@Component({
	selector: "app-discount-container",
	templateUrl: "./discount-container.component.html",
	styleUrls: ["./discount-container.component.scss"]
})
export class DiscountContainerComponent implements OnInit, OnDestroy {
	public discountPool: DiscountPool;

	// Para el modal
	public suscription: Subscription;
	public modalStatus: boolean;

	constructor(private discountBillModalService: DiscountBillModalService) {
		this.suscription = this.discountBillModalService.Display.subscribe({
			next: (value: boolean) => {
				this.modalStatus = value;
			}
		});

		// this.discountPool = {
		// 	deliveredValue: 10000,
		// 	receivedValue: 9000,
		// 	tcea: 0.25
		// };
	}

	ngOnInit() {}

	ngOnDestroy() {
		this.suscription.unsubscribe();
	}
}
