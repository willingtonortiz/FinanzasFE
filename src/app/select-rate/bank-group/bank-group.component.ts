import { Component, OnInit, OnDestroy } from "@angular/core";
import { Bank } from "src/app/_models";
import { BankService } from "src/app/_services";
import { Subscription } from "rxjs";

@Component({
	selector: "app-bank-group",
	templateUrl: "./bank-group.component.html",
	styleUrls: ["./bank-group.component.scss"]
})
export class BankGroupComponent implements OnInit, OnDestroy {
	public banks: Bank[];
	public suscription: Subscription;

	constructor(private bankService: BankService) {
		this.banks = null;
	}

	ngOnInit() {
		this.suscription = this.bankService.findAll().subscribe({
			next: (banks: Bank[]) => {
				this.banks = banks;
			},
			error: (error: any) => {
				console.log(error);
			}
		});
	}

	ngOnDestroy() {
		this.suscription.unsubscribe();
	}
}
