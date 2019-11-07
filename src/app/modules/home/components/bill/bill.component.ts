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
	public percentage: string = "0px";

	constructor() {}

	ngOnInit() {
		// console.log(this.bill.startDate);
		//console.log(this.bill);
		// this.bill.startDate = new Date(this.bill.startDate);
		// this.bill.endDate = new Date(this.bill.endDate);
		//console.log(d.toDateString());

		this.setDaysPercentage();
	}

	public async setDaysPercentage(): Promise<void> {
		return new Promise((resolve, reject) => {
			const start: number = this.bill.startDate.getTime();
			const end: number = this.bill.endDate.getTime();
			const today = Date.now();

			const percentage = ((today - start) / (end - start)) * 100;
			this.percentage = `${percentage}%`;
		});
	}
}
