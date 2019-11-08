import { Component, OnInit, Input } from "@angular/core";
import { Bill } from "src/app/shared/models";

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
