import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { DiscountBillModalService } from "src/app/core/services/discount-bill-modal/discount-bill-modal.service";
import { DiscountBillCostsService } from "src/app/core/services";
import { DiscountBillService } from 'src/app/core/services/discount-bill/discount-bill.service';

@Component({
	selector: "app-select-bill-container",
	templateUrl: "./select-bill-container.component.html",
	styleUrls: ["./select-bill-container.component.scss"]
})
export class SelectBillContainerComponent implements OnInit, OnDestroy {
	private pageSuscription: Subscription;
	public page: number;

	constructor(
		private _discountBillModalService: DiscountBillModalService,
		private _discountBillService: DiscountBillService,
		private _discountBillCostService: DiscountBillCostsService
	) {
		this.page = 1;
		this.pageSuscription = this._discountBillModalService.Page.subscribe({
			next: (value: number) => {
				this.page = value;
			}
		});
	}

	ngOnInit() {}

	public closeModal(): void {
		this._discountBillService.rollback();
		this._discountBillCostService.restart();
		this._discountBillModalService.setPage(1);
		this._discountBillModalService.hide();
	}

	ngOnDestroy() {
		this.pageSuscription.unsubscribe();
	}
}
