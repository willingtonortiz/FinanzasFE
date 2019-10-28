import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import {
	Rate,
	CurrencyType,
	RateType,
	RateTerm,
	DiscountPool
} from "src/app/shared/models";
import { DiscountService, SelectBillService } from "src/app/core/services";

@Component({
	selector: "app-discount-container",
	templateUrl: "./discount-container.component.html",
	styleUrls: ["./discount-container.component.scss"]
})
export class DiscountContainerComponent implements OnInit, OnDestroy {
	public rate: Rate;
	public discountDate: string;
	public discountPool: DiscountPool;

	// Para el modal
	public suscription: Subscription;
	public modalStatus: boolean;

	constructor(
		private discountService: DiscountService,
		private selectBillService: SelectBillService
	) {
		this.suscription = this.selectBillService.Display.subscribe({
			next: (value: boolean) => {
				this.modalStatus = value;
			}
		});

		const today = new Date();
		this.discountDate = `${today.getFullYear()}-${today.getMonth() +
			1}-${today.getDate()}`;

		this.rate = {
			businessName: "Empresa S.A.C.",
			currency: CurrencyType.Dolares,
			rateTerm: RateTerm.Anual,
			rateType: RateType.Efectiva,
			rateValue: 0.123456
		};

		this.discountPool = {
			deliveredValue: 10000,
			receivedValue: 9000,
			tcea: 0.25
		};
	}

	ngOnInit() {}

	ngOnDestroy() {
		this.suscription.unsubscribe();
	}

	public showModal() {
		this.selectBillService.show();
	}
}
