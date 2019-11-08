import { Component, OnInit, Input } from "@angular/core";
import { Bill } from "src/app/shared/models";
import { BillService } from "src/app/core/http";
import { BillListService } from "src/app/core/services/bill-list/bill-list.service";

@Component({
	selector: "app-bill",
	templateUrl: "./bill.component.html",
	styleUrls: ["./bill.component.scss"]
})
export class BillComponent implements OnInit {
	@Input() bill: Bill;
	public percentage: string = "0px";

	constructor(private _billListService: BillListService) {}

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

	public async deleteBill() {
		try {
			await this._billListService.deleteById(this.bill.id);
		} catch (error) {
			console.log("ERROR EN BILL DETAIL COMPONENT");
		}
	}
}
