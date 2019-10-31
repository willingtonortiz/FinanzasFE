import { Injectable } from "@angular/core";
import { Cost } from "src/app/shared/models";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
	providedIn: "root"
})
// Maneja los descuentos de la letra a descontar
export class DiscountBillCostsService {
	private _initialCostsSubject: BehaviorSubject<Array<Cost>>;
	private _initialCostsObservable: Observable<Array<Cost>>;

	private _finalCostsSubject: BehaviorSubject<Array<Cost>>;
	private _finalCostsObservable: Observable<Array<Cost>>;

	private _initialCosts: Array<Cost>;
	private _finalCosts: Array<Cost>;

	public constructor() {
		this.restart();
		this._initialCostsSubject = new BehaviorSubject<Array<Cost>>(
			this._initialCosts
		);
		this._initialCostsObservable = this._initialCostsSubject.asObservable();

		this._finalCostsSubject = new BehaviorSubject<Array<Cost>>(
			this._finalCosts
		);
		this._finalCostsObservable = this._finalCostsSubject.asObservable();
	}

	public addInitialCost(cost: Cost): void {
		this._initialCosts.push(cost);
		this._initialCostsSubject.next(this._initialCosts);
	}

	public addFinalCost(cost: Cost): void {
		this._finalCosts.push(cost);
		this._finalCostsSubject.next(this._finalCosts);
	}

	public restart(): void {
		this._initialCosts = new Array<Cost>();
		this._finalCosts = new Array<Cost>();
	}

	public get initialCostsValue(): Array<Cost> {
		return this._initialCostsSubject.value;
	}

	public get finalCostsValue(): Array<Cost> {
		return this._finalCostsSubject.value;
	}

	public get initialCostsObservable(): Observable<Array<Cost>> {
		return this._initialCostsObservable;
	}

	public get finalCostsObservable(): Observable<Array<Cost>> {
		return this._finalCostsObservable;
	}
}
