import { Injectable } from "@angular/core";
import { Bill } from "src/app/shared/models";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root"
})
// Maneja la letra a descontar
export class DiscountBillService {
	private _billSubject: BehaviorSubject<Bill>;
	private _billObservable: Observable<Bill>;

	private _bill: Bill;

	public constructor() {
		// this.bill = {};
		this._billSubject = new BehaviorSubject<Bill>(null);
		this._billObservable = this._billSubject.asObservable();
	}

	get billValue(): Bill {
		return this._billSubject.value;
	}

	get billObservable(): Observable<Bill> {
		return this._billObservable;
	}

	public setBill(bill: Bill): void {
		this._billSubject.next(bill);
	}
}
