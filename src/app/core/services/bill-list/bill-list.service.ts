import { Injectable } from "@angular/core";
import { BillService } from "../../http";
import { Bill } from "src/app/shared/models";
import { AuthenticationService } from "../../authentication";
import { UserCredentials } from "src/app/shared/dtos";
import { BillType, BillStatus } from "src/app/shared/enums";

@Injectable({
	providedIn: "root"
})
export class BillListService {
	public bills: Array<Bill>;
	public currentUser: UserCredentials;

	constructor(
		private authenticationService: AuthenticationService,
		private billService: BillService
	) {
		this.bills = null;
		this.currentUser = this.authenticationService.currentUserValue;
		this.initialize();
	}

	public async initialize(): Promise<void> {
		await this.fetchBills();
	}

	public async fetchBills() {
		try {
			this.bills = await this.billService.findByUserId(
				this.currentUser.id
			);

			// Arreglando las fechas de las letras
			this.bills.forEach(x => {
				x.startDate = new Date(x.startDate);
				x.endDate = new Date(x.endDate);
			});

			// console.log("Letras cargadas", this.bills);
		} catch (error) {
			console.log("ERROR EN => BILL_LIST_SERVICES");
		}
	}

	public async checkBills(): Promise<void> {
		if (this.bills === null) {
			await this.fetchBills();
		}
	}

	public async getBillsToPay(): Promise<Array<Bill>> {
		await this.checkBills();
		return this.bills.filter(x => x.type === BillType.TO_PAY);
	}

	public async getBillsToCharge(): Promise<Array<Bill>> {
		await this.checkBills();
		return this.bills.filter(
			x =>
				x.type === BillType.TO_CHARGE &&
				x.status !== BillStatus.DISCOUNTING
		);
	}

	public async getDiscountedBills(): Promise<Array<Bill>> {
		await this.checkBills();
		return this.bills.filter(x => x.status === BillStatus.DISCOUNTED);
	}
}
