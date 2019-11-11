import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Bill } from "src/app/shared/models";

@Injectable({
	providedIn: "root"
})
export class SelectedBillService {
	private _billSubject: BehaviorSubject<Bill>;

	constructor() {
		this._billSubject = new BehaviorSubject<Bill>(null);
	}

	public setBill(bill: Bill): void {
		this._billSubject.next(bill);
	}

	public get billValue(): Bill {
		return this._billSubject.value;
	}
}
