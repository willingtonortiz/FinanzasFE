import { Injectable } from "@angular/core";
import { Bill } from "src/app/shared/models";
import { Observable, BehaviorSubject } from "rxjs";
import { BillStatus } from "src/app/shared/enums";

@Injectable({
	providedIn: "root"
})
// Maneja la letra a descontar
export class DiscountBillService {
	private _billSubject: BehaviorSubject<Bill>;
	private _billObservable: Observable<Bill>;

	public constructor() {
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

	/**
	 * Deshace los cambios en la letra
	 */
	public rollback(): void {
		const bill: Bill = this.billValue;
		if (bill === null) return;
		if (bill.status === BillStatus.DISCOUNTING) {
			bill.status = BillStatus.VALID;
		}
		this.setBill(null);
	}

	/**
	 * Deja de trackear la letra, pero los cambios siguen
	 */
	public untrackBill(): void {
		this.setBill(null);
	}
}
