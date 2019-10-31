import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Location } from "@angular/common";

import { Bill } from "src/app/shared/models";
import { BillService } from "src/app/core/http";

@Component({
	selector: "app-bill-detail",
	templateUrl: "./bill-detail.component.html",
	styleUrls: ["./bill-detail.component.scss"]
})
export class BillDetailComponent implements OnInit, OnDestroy {
	public bill: Bill;

	private suscription: Subscription;

	constructor(
		private activatedRoute: ActivatedRoute,
		private location: Location,
		private billService: BillService
	) {
		this.bill = {};
	}

	public async ngOnInit() {
		const billId = this.activatedRoute.snapshot.paramMap.get("id");

		try {
			this.bill = await this.billService.findById(billId);
		} catch (error) {
			console.log(error);
		}
	}

	ngOnDestroy() {
		this.suscription.unsubscribe();
	}

	goBack() {
		this.location.back();
	}
}
