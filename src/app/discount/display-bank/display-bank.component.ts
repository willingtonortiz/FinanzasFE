import { Component, OnInit, Input } from "@angular/core";
import { Bank } from "src/app/_models";
import { BankService } from "src/app/_services";

@Component({
	selector: "app-display-bank",
	templateUrl: "./display-bank.component.html",
	styleUrls: ["./display-bank.component.scss"]
})
export class DisplayBankComponent implements OnInit {
	@Input() public bank: Bank;

	constructor() {
		// this.bank = null;
	}

	ngOnInit() {}
}
