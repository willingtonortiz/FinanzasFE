import { Injectable } from "@angular/core";
import { BillService } from "../../http";
import { Bill } from "src/app/shared/models";
import { AuthenticationService } from "../../authentication";
import { UserCredentials } from "src/app/shared/dtos";
import { BillType, BillStatus } from "src/app/shared/enums";
import { Observable, BehaviorSubject } from "rxjs";
import { filter, map } from "rxjs/operators";

@Injectable({
	providedIn: "root"
})
export class BillListService {
	private billsSubject: BehaviorSubject<Bill[]>;
	private billsToPayObservable: Observable<Bill[]>;
	private billsToChargeObservable: Observable<Bill[]>;
	private discountedBillsObservable: Observable<Bill[]>;

	// private bills: Array<Bill>;
	private currentUser: UserCredentials;

	constructor(
		private _authenticationService: AuthenticationService,
		private _billService: BillService
	) {
		// this.bills = [];
		this.billsSubject = new BehaviorSubject<Bill[]>([]);

		this.billsToPayObservable = this.billsSubject.pipe(
			map((bills: Bill[]) =>
				bills.filter(x => x.type === BillType.TO_PAY)
			)
		);

		this.billsToChargeObservable = this.billsSubject.pipe(
			map((bills: Bill[]) =>
				bills.filter(
					x =>
						x.type === BillType.TO_CHARGE &&
						x.status !== BillStatus.DISCOUNTED &&
						x.status !== BillStatus.DISCOUNTING
				)
			)
		);

		this.discountedBillsObservable = this.billsSubject.pipe(
			map((bills: Bill[]) =>
				bills.filter(x => x.status === BillStatus.DISCOUNTED)
			)
		);

		this.currentUser = this._authenticationService.currentUserValue;
		this.initialize();
	}

	public async initialize(): Promise<void> {
		await this.fetchBills();
	}

	public async fetchBills() {
		try {
			const bills = await this._billService.findByUserId(
				this.currentUser.id
			);

			this.billsSubject.next(bills);
		} catch (error) {
			console.log("ERROR EN => BILL_LIST_SERVICES");
		}
	}

	public async deleteById(billId: number): Promise<void> {
		try {
			await this._billService.deleteById(billId);
			await this.fetchBills();
		} catch (error) {
			return error;
		}
	}

	public getBillsToPay(): Observable<Bill[]> {
		return this.billsToPayObservable;
	}

	public getBillsToCharge(): Observable<Bill[]> {
		return this.billsToChargeObservable;
	}

	public getDiscountedBills(): Observable<Bill[]> {
		return this.discountedBillsObservable;
	}
}
