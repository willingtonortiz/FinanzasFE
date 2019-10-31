import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Discount } from "src/app/shared/models";

@Injectable({
	providedIn: "root"
})
export class CreateNewDiscountService {
	private _discountSubject: Subject<Discount>;
	private _discountObservable: Observable<Discount>;

	constructor() {
		this._discountSubject = new Subject<Discount>();
		// this._discountSubject.pipe(skip(1));

		this._discountObservable = this._discountSubject.asObservable();
		// .asObservable();
	}

	public setDiscount(discount: Discount): void {
		this._discountSubject.next(discount);
	}

	get discountObservable(): Observable<Discount> {
		return this._discountObservable;
	}
}
