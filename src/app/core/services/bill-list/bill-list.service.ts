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
	private _billsSubject: BehaviorSubject<Bill[]>;
	private _billsToPayObservable: Observable<Bill[]>;
	private _billsToChargeObservable: Observable<Bill[]>;
	private _discountedBillsObservable: Observable<Bill[]>;

	private currentUser: UserCredentials;

	constructor(
		private _authenticationService: AuthenticationService,
		private _billService: BillService
	) {
		this._billsSubject = new BehaviorSubject<Bill[]>([]);

		this._billsToPayObservable = this._billsSubject.pipe(
			map((bills: Bill[]) =>
				bills.filter(x => x.type === BillType.TO_PAY)
			)
		);

		this._billsToChargeObservable = this._billsSubject.pipe(
			map((bills: Bill[]) =>
				bills.filter(
					x =>
						x.type === BillType.TO_CHARGE &&
						x.status !== BillStatus.DISCOUNTED &&
						x.status !== BillStatus.DISCOUNTING
				)
			)
		);

		this._discountedBillsObservable = this._billsSubject.pipe(
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
			this._billsSubject.next(bills);
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

	public getValidBillsToCharge(): Observable<Bill[]> {
		return this._billsToChargeObservable.pipe(
			map((bills: Bill[]) =>
				bills.filter(x => x.status === BillStatus.VALID)
			)
		);
	}

	public getBillsToPay(): Observable<Bill[]> {
		return this._billsToPayObservable;
	}

	public getBillsToCharge(): Observable<Bill[]> {
		return this._billsToChargeObservable;
	}

	public getDiscountedBills(): Observable<Bill[]> {
		return this._discountedBillsObservable;
	}
}
