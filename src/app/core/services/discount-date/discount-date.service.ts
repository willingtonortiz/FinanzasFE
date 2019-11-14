import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { DateUtilsService } from "../date-utils/date-utils.service";

@Injectable({
	providedIn: "root"
})
// Maneja la fecha del descuento
export class DiscountDateService {
	private _discountDateSubject: BehaviorSubject<Date>;
	private _discountDateObservable: Observable<Date>;

	public constructor(private _dateUtilsService: DateUtilsService) {
		this._discountDateSubject = new BehaviorSubject<Date>(
			this._dateUtilsService.getTodaysDate()
		);

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
