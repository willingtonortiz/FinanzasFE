import { Injectable, OnDestroy } from "@angular/core";
import { Rate } from "src/app/shared/models";
import { BehaviorSubject, Observable, Subscription } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class DiscountPoolRateService {
	private _rateSubject: BehaviorSubject<Rate>;
	private _rateObservable: Observable<Rate>;

	private _rate: Rate;

	constructor() {
		this._rate = {};
		this._rateSubject = new BehaviorSubject<Rate>(this._rate);
		this._rateObservable = this._rateSubject.asObservable();
	}

	public setRate(rate: Rate) {
		this._rateSubject.next(rate);
	}

	get rateValue(): Rate {
		return this._rateSubject.value;
	}

	get rateObservable(): Observable<Rate> {
		return this._rateObservable;
	}
}
