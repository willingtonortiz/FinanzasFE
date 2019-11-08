import {
	Component,
	OnInit,
	Input,
	OnChanges,
	SimpleChanges
} from "@angular/core";
import { Bill } from "src/app/shared/models";

@Component({
	selector: "app-bill-progress-bar",
	templateUrl: "./bill-progress-bar.component.html",
	styleUrls: ["./bill-progress-bar.component.scss"]
})
export class BillProgressBarComponent implements OnInit, OnChanges {
	@Input() bill: Bill;
	public percentage: string = "0px";
	public remainingDays: string = "0";
	public totalDays: string = "0";
	public elapsedDays: string = "0";

	constructor() {}

	async ngOnInit() {}

	async ngOnChanges(changes: SimpleChanges): Promise<void> {
		this.setDaysPercentage();
		this.computeInfo();
	}

	public getTodaysMilliseconds(): number {
		const date = new Date();
		const today = new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate()
		);

		return today.getTime();
	}

	public setDaysPercentage() {
		const start: number = this.bill.startDate.getTime();
		const end: number = this.bill.endDate.getTime();
		const today = this.getTodaysMilliseconds();

		const percentage = ((today - start) / (end - start)) * 100;
		this.percentage = `${percentage}%`;
	}

	public computeInfo() {
		const start: number = this.bill.startDate.getTime();
		const end: number = this.bill.endDate.getTime();
		const today = this.getTodaysMilliseconds();

		const remain = (end - today) / (1000 * 60 * 60 * 24);
		this.remainingDays = `${remain}`;

		const total = (end - start) / (1000 * 60 * 60 * 24);
		this.totalDays = `${total}`;

		const elapsed = total - remain;
		this.elapsedDays = `${elapsed}`;
	}
}
