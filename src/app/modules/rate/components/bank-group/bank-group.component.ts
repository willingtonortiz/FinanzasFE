import { Component, OnInit, OnDestroy, OnChanges } from "@angular/core";

import { Bank } from "src/app/shared/models";
import { BankService } from "src/app/core/http";

@Component({
	selector: "app-bank-group",
	templateUrl: "./bank-group.component.html",
	styleUrls: ["./bank-group.component.scss"]
})
export class BankGroupComponent implements OnInit, OnChanges {
	public banks: Bank[];

	constructor(private bankService: BankService) {}

	async ngOnInit() {
		this.banks = [];

		try {
			const banks = await this.bankService.findAll();
			this.banks = banks;
		} catch (error) {
			console.log(error);
		}
	}

	ngOnChanges() {}
}
