import { Component, OnInit, Input } from "@angular/core";
import { Bill } from "src/app/shared/models";
import { BillDto } from "src/app/shared/dtos";

@Component({
	selector: "app-bill",
	templateUrl: "./bill.component.html",
	styleUrls: ["./bill.component.scss"]
})
export class BillComponent implements OnInit {
	@Input() bill: Bill;

	constructor() {}

	ngOnInit() {
		//console.log(this.bill);
		this.bill.startDate=new Date(this.bill.startDate);
		this.bill.endDate=new Date(this.bill.endDate);
		//console.log(d.toDateString());
	}
}
