import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

import { DiscountPool, Discount } from "src/app/shared/models";

@Injectable({
	providedIn: "root"
})
export class DiscountPoolDataService {
	private _discountPoolSubject: BehaviorSubject<DiscountPool>;
	private _discountPoolObservable: Observable<DiscountPool>;

	public constructor() {
		// Valores iniciales por defecto
		this._discountPoolSubject = new BehaviorSubject<DiscountPool>({
			receivedValue: 0,
			deliveredValue: 0,
			tcea: 0
		});
		this._discountPoolObservable = this._discountPoolSubject.asObservable();
	}

	public setDiscountPool(discountPool: DiscountPool): void {
		this._discountPoolSubject.next(discountPool);
	}

	get discountPoolValue(): DiscountPool {
		return this._discountPoolSubject.value;
	}

	get discountPoolObservable(): Observable<DiscountPool> {
		return this._discountPoolObservable;
	}
}
