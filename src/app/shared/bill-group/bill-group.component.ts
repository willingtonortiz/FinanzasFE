import { Component, OnInit } from "@angular/core";
import { Bill } from "src/app/_models";
import { AuthenticationService, BillService } from "src/app/_services";

@Component({
	selector: "app-bill-group",
	templateUrl: "./bill-group.component.html",
	styleUrls: ["./bill-group.component.scss"]
})
export class BillGroupComponent implements OnInit {
	public bills: Bill[];

	constructor(
		private authenticationService: AuthenticationService,
		private billService: BillService
	) {
		// this.bills = [
		// 	{
		// 		startDate: new Date(Date.now()),
		// 		endDate: new Date(Date.now()),
		// 		amount: 1000,
		// 		billType: "Pendiente1"
		// 	},
		// 	{
		// 		startDate: new Date(Date.now()),
		// 		endDate: new Date(Date.now()),
		// 		amount: 1000,
		// 		billType: "Pendiente2"
		// 	},
		// 	{
		// 		startDate: new Date(Date.now()),
		// 		endDate: new Date(Date.now()),
		// 		amount: 1000,
		// 		billType: "Pendiente3"
		// 	},
		// 	{
		// 		startDate: new Date(Date.now()),
		// 		endDate: new Date(Date.now()),
		// 		amount: 1000,
		// 		billType: "Pendiente3"
		// 	}
		// ];

		this.billService
			.findAllByRuc(this.authenticationService.currentUserValue.username)
			.subscribe({
				next: (data: Bill[]) => {
					data = data.map(x => {
						x.startDate = new Date(x.startDate);
						x.endDate = new Date(x.endDate);
						return x;
					});
					console.log(data);
					this.bills = data;
				},
				error: error => {
					console.log(error);
				}
			});
	}

	ngOnInit() {}
}
