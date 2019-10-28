import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { SelectBillService } from "src/app/core/services";

@Component({
	selector: "app-select-bill-container",
	templateUrl: "./select-bill-container.component.html",
	styleUrls: ["./select-bill-container.component.scss"]
})
export class SelectBillContainerComponent implements OnInit, OnDestroy {
	private pageSuscription: Subscription;
	public page: number;

	constructor(private selectBillService: SelectBillService) {
		this.page = 1;
		this.pageSuscription = this.selectBillService.Page.subscribe({
			next: (value: number) => {
				this.page = value;
			}
		});
	}

	ngOnInit() {}

	ngOnDestroy() {
		this.pageSuscription.unsubscribe();
	}
}
