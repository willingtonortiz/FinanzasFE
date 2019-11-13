import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { DiscountBillModalService } from "src/app/core/services/discount-bill-modal/discount-bill-modal.service";

@Component({
	selector: "app-select-bill-container",
	templateUrl: "./select-bill-container.component.html",
	styleUrls: ["./select-bill-container.component.scss"]
})
export class SelectBillContainerComponent implements OnInit, OnDestroy {
	private pageSuscription: Subscription;
	public page: number;

	constructor(private discountBillModalService: DiscountBillModalService) {
		this.page = 1;
		this.pageSuscription = this.discountBillModalService.Page.subscribe({
			next: (value: number) => {
				this.page = value;
			}
		});
	}

	ngOnInit() {}

	public closeModal(): void {
		this.discountBillModalService.hide();
	}

	ngOnDestroy() {
		this.pageSuscription.unsubscribe();
	}
}
