import {
	Component,
	OnInit,
	Input,
	OnChanges,
	SimpleChanges
} from "@angular/core";
import { Bill } from "src/app/shared/models";
import { DateUtilsService } from "src/app/core/services";
import { BillStatus } from "src/app/shared/enums";

@Component({
	selector: "app-bill-progress-bar",
	templateUrl: "./bill-progress-bar.component.html",
	styleUrls: ["./bill-progress-bar.component.scss"]
})
export class BillProgressBarComponent implements OnInit, OnChanges {
	@Input() bill: Bill;
	public percentage: string = "0px";
	public remainingDays: number = 0;
	public totalDays: number = 0;
	public elapsedDays: number = 0;

	public isExpired: boolean = false;

	constructor(private _dateUtilsService: DateUtilsService) {}

	async ngOnInit() {
		if (this.bill.status === BillStatus.EXPIRED) {
			this.isExpired = true;
		}
	}

	async ngOnChanges(changes: SimpleChanges): Promise<void> {
		this.setDaysPercentage();
		this.computeInfo();
	}

	public setDaysPercentage(): void {
		const start: number = this.bill.startDate.getTime();
		const end: number = this.bill.endDate.getTime();
		const today: number = this._dateUtilsService.getTodaysDate().getTime();

		if (end < today) {
			this.percentage = `${100}%`;
			return;
		}

		const percentage = ((today - start) / (end - start)) * 100;
		this.percentage = `${percentage}%`;
	}

	public computeInfo(): void {
		const start: number = this.bill.startDate.getTime();
		const end: number = this.bill.endDate.getTime();
		const today: number = this._dateUtilsService.getTodaysDate().getTime();

		const total = (end - start) / (1000 * 60 * 60 * 24);
		const remain = (end - today) / (1000 * 60 * 60 * 24);
		const elapsed = total - remain;

		this.totalDays = total;

		if (end < today) {
			this.remainingDays = 0;
			this.elapsedDays = total + Math.abs(remain);
			return;
		}

		this.remainingDays = remain;
		this.elapsedDays = elapsed;
	}
}
