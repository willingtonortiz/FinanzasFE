import { Component, OnInit, Input } from "@angular/core";
import { Bill } from "src/app/shared/models";
import { BillService } from "src/app/core/http";
import { BillListService } from "src/app/core/services/bill-list/bill-list.service";
import { DateUtilsService } from "src/app/core/services";

@Component({
	selector: "app-bill",
	templateUrl: "./bill.component.html",
	styleUrls: ["./bill.component.scss"]
})
export class BillComponent implements OnInit {
	@Input() bill: Bill;
	public percentage: string = "0px";
	public isExpired: boolean = false;

	constructor(
		private _billListService: BillListService,
		private _dateUtilsService: DateUtilsService
	) {}

	ngOnInit() {
		this.setDaysPercentage();
	}

	public async setDaysPercentage(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			const start: number = this.bill.startDate.getTime();
			const end: number = this.bill.endDate.getTime();
			const today = this._dateUtilsService.getTodaysDate().getTime();

			if (end < today) {
				this.percentage = "100%";
				this.isExpired = true;
				resolve();
				return;
			}

			const percentage = ((today - start) / (end - start)) * 100;
			this.percentage = `${percentage}%`;

			resolve();
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
