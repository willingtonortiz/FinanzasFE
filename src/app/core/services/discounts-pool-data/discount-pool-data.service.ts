import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

import { DiscountPool, Discount } from "src/app/shared/models";

@Injectable({
	providedIn: "root"
})
export class DiscountPoolDataService {
	private discountPoolSubject: BehaviorSubject<DiscountPool>;
	private discountPoolObservable: Observable<DiscountPool>;

	private discountPool: DiscountPool;

	public constructor() {
		// borrar dato de prueba
		this.discountPool = {
			receivedValue: 0,
			deliveredValue: 0,
			tcea: 0,
			discounts: new Array<Discount>()
		};

		this.discountPoolSubject = new BehaviorSubject<DiscountPool>(
			this.discountPool
		);
		this.discountPoolObservable = this.discountPoolSubject.asObservable();

	}

	get DiscountPoolObservable(): Observable<DiscountPool> {
		return this.discountPoolObservable;
	}
}
