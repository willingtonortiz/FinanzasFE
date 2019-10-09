import { Component, OnInit, Input } from "@angular/core";
import { Bill } from "src/app/_models";

@Component({
	selector: "app-bill",
	templateUrl: "./bill.component.html",
	styleUrls: ["./bill.component.scss"]
})
export class BillComponent implements OnInit {
	@Input() bill: Bill;

	constructor() {}

	ngOnInit() {
	}
}
