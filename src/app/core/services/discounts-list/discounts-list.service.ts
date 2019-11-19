import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { Discount, DiscountPool } from "src/app/shared/models";
import { CreateNewDiscountService } from "../create-new-discount/create-new-discount.service";
import { map } from "rxjs/operators";
import { BillStatus } from "src/app/shared/enums";
import { DiscountPoolDataService } from '..';

@Injectable({
	providedIn: "root"
})
// Maneja la lista de descuentos
// Escucha si se agrega un nuevo descuento
export class DiscountsListService implements OnDestroy {
	private _discountsSubject: BehaviorSubject<Discount[]>;
	private _discountsObservable: Observable<Discount[]>;

	private _suscriptions: Array<Subscription>;

	constructor(private createNewDiscountService: CreateNewDiscountService
	) {
		this._discountsSubject = new BehaviorSubject<Array<DiscountPool>>([]);

		this._discountsObservable = this._discountsSubject.pipe(
			map(x =>
				x.map((y, index) => {
					y.id = index;
					return y;
				})
			)
		);

		this._suscriptions = new Array<Subscription>();

		this._suscriptions.push(
			this.createNewDiscountService.discountObservable.subscribe({
				next: (discount: Discount) => {
					this.addDiscount(discount);
				},
				error: error => {
					console.log("Error en discounts-list.service", error);
				}
			})
		);
	}

	public ngOnDestroy() {
		this._suscriptions.forEach(x => x.unsubscribe());
	}

	public setDiscounts(discounts: Discount[]): void {
		this._discountsSubject.next(discounts);
	}

	/**
	 * Agrega un descuento a la lista
	 * @param newDiscount nuevo descuento
	 */
	public addDiscount(newDiscount: Discount): void {
		const discounts = this.discountsValue;
		discounts.push(newDiscount);

		this._discountsSubject.next(discounts);
	}

	public deleteDiscount(discountId: number): void {
		let discounts: Discount[] = this.discountsValue;
		discounts[discountId].bill.status = BillStatus.VALID;
		discounts = discounts.filter(x => x.id !== discountId);
		this._discountsSubject.next(discounts);

	}

	public restart(): void {
		this.setDiscounts([]);
	}

	public get discountsValue(): Discount[] {
		return this._discountsSubject.value;
	}

	get discountsObservable(): Observable<Discount[]> {
		return this._discountsObservable;
	}
}
