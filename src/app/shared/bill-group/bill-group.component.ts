import { Component, OnInit } from "@angular/core";
import { Bill, BillType } from "src/app/_models";
import { AuthenticationService, BillService } from "src/app/_services";
import { BillDto } from "src/app/_dtos";

@Component({
	selector: "app-bill-group",
	templateUrl: "./bill-group.component.html",
	styleUrls: ["./bill-group.component.scss"]
})
export class BillGroupComponent implements OnInit {
	public bills: Bill[];
	public selectedBills: Bill[];
	public billType: number;

	constructor(
		private authenticationService: AuthenticationService,
		private billService: BillService
	) {
		this.billType = BillType.ToPay;
		this.billService
			.findByUserId(this.authenticationService.currentUserValue.id)
			.subscribe({
				next: (data: Bill[]) => {
					data = data.map(x => {
						x.startDate = new Date(x.startDate);
						x.endDate = new Date(x.endDate);
						return x;
					});
					this.bills = data;
					this.updateBills();
				},
				error: error => {
					console.log(error);
				}
			});
	}

	ngOnInit() {}

	changeType(type: number) {
		if (type !== this.billType) {
			this.billType = type;
			this.updateBills();
		}
	}

	updateBills() {
		this.selectedBills = this.bills.filter(
			x => x.billType === this.billType
		);
	}
}
