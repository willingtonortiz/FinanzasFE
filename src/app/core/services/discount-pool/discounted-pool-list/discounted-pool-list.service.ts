import { Injectable } from "@angular/core";
import { DiscountPoolService } from "src/app/core/http";
import { Subscription, BehaviorSubject, Observable } from "rxjs";
import { DiscountPool } from "src/app/shared/models";
import { AuthenticationService } from "src/app/core/authentication";
import { UserCredentials } from "src/app/shared/dtos";

@Injectable({
	providedIn: "root"
})
export class DiscountedPoolListService {
	private _suscriptions: Subscription[];
	private _discountedPoolSubject: BehaviorSubject<DiscountPool[]>;
	private _discountedPoolObservable: Observable<DiscountPool[]>;
	private _currentUser: UserCredentials;

	constructor(
		private _discountPoolHttpService: DiscountPoolService,
		private _authenticationService: AuthenticationService
	) {
		this._suscriptions = new Array<Subscription>();

		this._discountedPoolSubject = new BehaviorSubject<DiscountPool[]>([]);

		this._discountedPoolObservable = this._discountedPoolSubject.asObservable();

		this._suscriptions.push(
			this._authenticationService.currentUserObservable.subscribe({
				next: (user: UserCredentials) => {
					this._currentUser = user;
					this.fetchDiscountedPools();
				}
			})
		);
	}

	public async fetchDiscountedPools(): Promise<void> {
		try {
			if (this._currentUser === null) {
				return null;
			}

			const discounts = await this._discountPoolHttpService.findDiscountsPoolByPymeId(
				this._currentUser.id
			);
			this._discountedPoolSubject.next(discounts);
		} catch (error) {
			console.log("ERROR EN => DISCOUNTED POOL LIST SERVICE");
		}
	}

	public getDiscountedPools(): Observable<DiscountPool[]> {
		return this._discountedPoolObservable;
	}
}
