import { Component, OnInit } from "@angular/core";
import {
	BillService,
	UserService,
	AuthenticationService
} from "src/app/_services";
import { Bill, User } from "src/app/_models";

@Component({
	selector: "app-select-bill-group",
	templateUrl: "./select-bill-group.component.html",
	styleUrls: ["./select-bill-group.component.scss"]
})
export class SelectBillGroupComponent implements OnInit {
	public bills: Bill[];
	public user: User;

	constructor(
		private authenticationService: AuthenticationService,
		private billService: BillService
	) {
		this.user = this.authenticationService.currentUserValue;

		this.billService.findByUserId(this.user.id).subscribe({
			next: (bills: Bill[]) => {
				this.bills = bills;
				// console.log(this.bills.length);
			},
			error: (error: any) => {
				console.log(error);
			}
		});
	}

	ngOnInit() {}
}
