import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { Discount, DiscountPool } from "src/app/shared/models";
import { CreateNewDiscountService } from "../create-new-discount/create-new-discount.service";
import { skip } from "rxjs/operators";

@Injectable({
	providedIn: "root"
})
export class DiscountsListService implements OnDestroy {
	private _discountsSubject: BehaviorSubject<Array<Discount>>;
	private _discountsObservable: Observable<Array<Discount>>;

	private _suscriptions: Array<Subscription>;

	private _discounts: Array<Discount>;

	constructor(private createNewDiscountService: CreateNewDiscountService) {
		this._discounts = new Array<Discount>();

		this._discountsSubject = new BehaviorSubject<Array<DiscountPool>>(
			this._discounts
		);

		this._discountsObservable = this._discountsSubject.asObservable();

		this._suscriptions = new Array<Subscription>();

		this._suscriptions.push(
			this.createNewDiscountService.discountObservable.subscribe({
				next: (discount: Discount) => {
					// console.log("waiting");
					this.addDiscount(discount);
				},
				error: error => {
					console.log("Error en discounts-list.service", error);
				}
			})
		);
	}

	public ngOnDestroy() {
		this._suscriptions.forEach(x => x.unsubscribe());
	}

	public addDiscount(discount: Discount): void {
		this._discounts.push(discount);
		// this.discountPool.receivedValue += discount.receivedValue;
		// this.discountPool.deliveredValue += discount.deliveredValue;

		this._discountsSubject.next(this._discounts);
	}

	get discountsObservable(): Observable<Array<Discount>> {
		return this._discountsObservable;
	}
}
