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

	public constructor() {
		this._initialCostsSubject = new BehaviorSubject<Array<Cost>>(
			new Array<Cost>()
		);
		this._initialCostsObservable = this._initialCostsSubject.asObservable();

		this._finalCostsSubject = new BehaviorSubject<Array<Cost>>(
			new Array<Cost>()
		);
		this._finalCostsObservable = this._finalCostsSubject.asObservable();
	}

	public addInitialCost(cost: Cost): void {
		const initialCosts = this.initialCostsValue;
		initialCosts.push(cost);
		this._initialCostsSubject.next(initialCosts);
	}

	public addFinalCost(cost: Cost): void {
		const finalCosts = this.finalCostsValue;
		finalCosts.push(cost);
		this._finalCostsSubject.next(finalCosts);
	}

	public restart(): void {
		this._initialCostsSubject.next(new Array<Cost>());
		this._finalCostsSubject.next(new Array<Cost>());
	}

	public get initialCostTotal(): number {
		let total: number = 0;
		const initialCosts: Array<Cost> = this.initialCostsValue;

		// TODO, VALIDAR QUE SEA PORCENTAJE O MONTO, DEPENDIENDO DEL TIPO
		initialCosts.forEach((x: Cost) => {
			total += x.amount;
		});

		return total;
	}

	public get finalCostTotal(): number {
		let total: number = 0;
		const finalCosts: Array<Cost> = this.finalCostsValue;

		// TODO, VALIDAR QUE SEA PORCENTAJE O MONTO, DEPENDIENDO DEL TIPO
		finalCosts.forEach((x: Cost) => {
			total += x.amount;
		});

		return total;
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
