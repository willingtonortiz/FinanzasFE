import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

import { DiscountPool, Discount } from "src/app/shared/models";

@Injectable({
	providedIn: "root"
})
// Maneja los datos de la cartera de descuento
export class DiscountPoolDataService {
	private _discountPoolSubject: BehaviorSubject<DiscountPool>;
	private _discountPoolObservable: Observable<DiscountPool>;
	private maximumDiscountDate: Date;
	private minimumDiscountDate: Date;

	public constructor() {
		// Valores iniciales por defecto
		this._discountPoolSubject = new BehaviorSubject<DiscountPool>({
			receivedValue: 0,
			deliveredValue: 0,
			tcea: 0
		});

		this._discountPoolObservable = this._discountPoolSubject.asObservable();

		this.maximumDiscountDate = new Date(9999, 12, 31);
		this.minimumDiscountDate = new Date(0, 1, 1);
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

	public setMaximumDiscountDate(date: Date): void {
		if (date < this.maximumDiscountDate) this.maximumDiscountDate = date;
	}

	public setMinimumDiscountDate(date: Date): void {
		if (date > this.minimumDiscountDate) this.minimumDiscountDate = date;
	}

	get maximumDiscountDateValue(): Date {
		return this.maximumDiscountDate;
	}

	get minimumDiscountDateValue(): Date {
		return this.minimumDiscountDate;
	}
}
