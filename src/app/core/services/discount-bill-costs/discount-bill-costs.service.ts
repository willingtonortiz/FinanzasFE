import { Injectable } from "@angular/core";
import { Cost } from "src/app/shared/models";
import { BehaviorSubject, Observable } from "rxjs";
import { PaymentType, CostType } from "src/app/shared/enums";
import { DiscountBillService } from "../discount-bill/discount-bill.service";

@Injectable({
	providedIn: "root"
})
// Maneja los descuentos de la letra a descontar
// Depende de la letra actual
export class DiscountBillCostsService {
	private _retentionSubject: BehaviorSubject<number>;

	private _initialCostsSubject: BehaviorSubject<Array<Cost>>;
	private _initialCostsObservable: Observable<Array<Cost>>;

	private _finalCostsSubject: BehaviorSubject<Array<Cost>>;
	private _finalCostsObservable: Observable<Array<Cost>>;

	public constructor(private _discountBillService: DiscountBillService) {
		this._retentionSubject = new BehaviorSubject<number>(0);

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

	public deleteCost(cost: Cost): void {
		if (cost.costType === CostType.INITIAL) {
			let initialCosts: Cost[] = this.initialCostsValue;
			initialCosts = initialCosts.filter(x => x.reason !== cost.reason);
			this._initialCostsSubject.next(initialCosts);
		} else if (cost.costType === CostType.FINAL) {
			let finalCosts: Cost[] = this.finalCostsValue;
			finalCosts = finalCosts.filter(x => x.reason !== cost.reason);
			this._finalCostsSubject.next(finalCosts);
		}
	}

	public get retentionValue(): number {
		return this._retentionSubject.value;
	}

	public setRetentionValue(retention: number): void {
		this._retentionSubject.next(retention);
	}

	public get initialCostTotal(): number {
		let total: number = 0;
		const initialCosts: Array<Cost> = this.initialCostsValue;
		const bill = this._discountBillService.billValue;

		initialCosts.forEach((x: Cost) => {
			if (x.paymentType === PaymentType.CASH) total += x.amount;
			else total += bill.amount * x.amount;
		});

		return total;
	}

	public get finalCostTotal(): number {
		let total: number = 0;
		const finalCosts: Array<Cost> = this.finalCostsValue;
		const bill = this._discountBillService.billValue;

		finalCosts.forEach((x: Cost) => {
			if (x.paymentType === PaymentType.CASH) total += x.amount;
			else total += bill.amount * x.amount;
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
