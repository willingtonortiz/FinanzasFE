import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class DiscountDateService {
	private _discountDateSubject: BehaviorSubject<Date>;
	private _discountDateObservable: Observable<Date>;

	public constructor() {
		const today = new Date(Date.now());
		this._discountDateSubject = new BehaviorSubject<Date>(
			// new Date('10/12/2008')
			new Date(today.getFullYear(), today.getMonth(), today.getDate())
		);

		// console.log(this._discountDateSubject.value);

		this._discountDateObservable = this._discountDateSubject.asObservable();
	}

	public setDiscountDate(date: Date): void {
		this._discountDateSubject.next(date);
	}

	public get discountDateValue(): Date {
		return this._discountDateSubject.value;
	}

	public get discountDateObservable(): Observable<Date> {
		return this._discountDateObservable;
	}
}
