import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

import { DiscountPool, Discount } from "src/app/shared/models";
import { CurrencyCode } from 'src/app/shared/enums';

@Injectable({
	providedIn: "root"
})
// Maneja los datos de la cartera de descuento
export class DiscountPoolDataService {
	private _discountPoolSubject: BehaviorSubject<DiscountPool>;
	private _discountPoolObservable: Observable<DiscountPool>;
	private maximumDiscountDate: Date;
	private minimumDiscountDate: Date;
	private currencyCode: CurrencyCode;
	private invalid: Boolean;

	public constructor() {
		// Valores iniciales por defecto
		this.currencyCode = 0;
		this.invalid = false;
		this._discountPoolSubject = new BehaviorSubject<DiscountPool>({
			currencyCode: this.currencyCode,
			receivedValue: 0,
			deliveredValue: 0,
			tcea: 0
		});

		this._discountPoolObservable = this._discountPoolSubject.asObservable();

		this.maximumDiscountDate = new Date(9999, 12, 31);
		this.minimumDiscountDate = new Date(0, 1, 1);
	}

	public reset(): void {
		this.maximumDiscountDate = new Date(9999, 12, 31);
		this.minimumDiscountDate = new Date(0, 1, 1);
		this.invalid = false;
	}

	public setDiscountPool(discountPool: DiscountPool): void {
		discountPool.currencyCode = this.currencyCode;
		this._discountPoolSubject.next(discountPool);
	}

	public setInvalid(invalid: boolean): void {
		if (!this.invalid)
			this.invalid = invalid;
	}

	public setCurrencyCode(currencyCode: CurrencyCode): void {
		this.currencyCode = currencyCode;
		this.setDiscountPool(this.discountPoolValue);
	}

	get invalidValue(): Boolean {
		return this.invalid;
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
