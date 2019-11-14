import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { BillService } from "../../http";
import { Bill } from "src/app/shared/models";
import { AuthenticationService } from "../../authentication";
import { UserCredentials } from "src/app/shared/dtos";
import { BillType, BillStatus, CurrencyCode } from "src/app/shared/enums";
import { Observable, BehaviorSubject, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { DiscountPoolRateService } from "../discount-pool-rate/discount-pool-rate.service";

@Injectable({
	providedIn: "root"
})
export class BillListService {
	private _suscriptions: Subscription[];
	private _billsSubject: BehaviorSubject<Bill[]>;
	private _billsToPayObservable: Observable<Bill[]>;
	private _billsToChargeObservable: Observable<Bill[]>;
	private _discountedBillsObservable: Observable<Bill[]>;
	private _currentUser: UserCredentials;

	constructor(
		private _authenticationService: AuthenticationService,
		private _billService: BillService,
		private _discountPoolRateService: DiscountPoolRateService
	) {
		this._suscriptions = new Array<Subscription>();

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

		this._suscriptions.push(
			this._authenticationService.currentUserObservable.subscribe({
				next: (user: UserCredentials) => {
					this._currentUser = user;
					this.fetchBills();
				}
			})
		);
	}

	public async fetchBills() {
		try {
			if (this._currentUser === null) {
				return;
			}

			const bills = await this._billService.findByUserId(
				this._currentUser.id
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
			console.log("ERROR EN => BILL LIST SERVICE => DELETE BY ID");
		}
	}

	public normalizeBills(): void {
		const bills: Bill[] = this._billsSubject.value;
		bills.forEach(x => {
			if (x.status === BillStatus.DISCOUNTING) {
				x.status = BillStatus.VALID;
			}
		});
		this._billsSubject.next(bills);
	}

	public getValidBillsToCharge(date: Date = null): Observable<Bill[]> {
		const currencyCode: CurrencyCode = this._discountPoolRateService
			.rateValue.currencyCode;

		return this._billsToChargeObservable.pipe(
			map((bills: Bill[]) =>
				bills.filter(
					x =>
						x.status === BillStatus.VALID &&
						x.currencyCode === currencyCode &&
						(date === null || (x.endDate >= date && date >= x.startDate))
				)
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

	public ngOnDestroy(): void {
		this._suscriptions.forEach(x => x.unsubscribe());
	}
}
