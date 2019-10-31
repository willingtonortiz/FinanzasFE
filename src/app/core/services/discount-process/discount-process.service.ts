import { Injectable, OnDestroy } from "@angular/core";
import { DiscountPoolRateService } from "../discount-pool-rate/discount-pool-rate.service";
import { CreateNewDiscountService } from "../create-new-discount/create-new-discount.service";
import { DiscountBillService } from "../discount-bill/discount-bill.service";
import { DiscountBillCostsService } from "../discount-bill-costs/discount-bill-costs.service";
import { DiscountPoolDataService } from "../discounts-pool-data/discount-pool-data.service";
import { DiscountsListService } from "../discounts-list/discounts-list.service";
import { Subscription } from "rxjs";
import { DiscountDateService } from "../discount-date/discount-date.service";
import { Discount, Cost, CostType, DiscountPool } from "src/app/shared/models";
import { DiscountFormulas, DiscountFormulasAdapter } from "../../clases";

@Injectable({
	providedIn: "root"
})
// Maneja el descuento de la cartera de letras
export class DiscountProcessService implements OnDestroy {
	private _suscriptions: Array<Subscription>;

	public constructor(
		private _createNewDiscountService: CreateNewDiscountService,
		private _discountPoolRateService: DiscountPoolRateService,
		private _discountBillService: DiscountBillService,
		private _discountBillCostsService: DiscountBillCostsService,
		private _discountPoolDataService: DiscountPoolDataService,
		private _discountListService: DiscountsListService,
		private _discountDateService: DiscountDateService
	) {
		this._suscriptions = new Array<Subscription>();
		this._suscriptions.push(
			this._discountDateService.discountDateObservable.subscribe({
				next: (date: Date) => {
					this.updateDiscounts();
				},
				error: error => {
					console.log("Error en DiscountProcessService");
				}
			})
		);
	}

	public updateDiscounts(): void {
		let discounts = this._discountListService.discountsValue;
		const rate = this._discountPoolRateService.rateValue;
		const date = this._discountDateService.discountDateValue;

		// console.log(date);
		// console.log(discounts[0].bill.endDate);

		discounts = discounts.map((x: Discount) =>
			DiscountFormulasAdapter.discountBill(
				rate,
				x.bill,
				x.costs.filter((y: Cost) => y.costType === CostType.Inicial),
				x.costs.filter((y: Cost) => y.costType === CostType.Final),
				date
			)
		);

		this._discountListService.setDiscounts(discounts);
		this.updateDiscountPool();
	}

	public updateDiscountPool(): void {
		const discounts = this._discountListService.discountsValue;

		const discountPool: DiscountPool = {
			receivedValue: 0,
			deliveredValue: 0,
			tcea: 0
		};

		discounts.forEach((x: Discount) => {
			discountPool.receivedValue += x.receivedValue;
			discountPool.deliveredValue += x.deliveredValue;
		});

		discountPool.tcea = DiscountFormulasAdapter.discountPoolTcea(
			discountPool,
			this._discountListService.discountsValue
		);

		this._discountPoolDataService.setDiscountPool(discountPool);
	}

	public discountCurrentBill() {
		const rate = this._discountPoolRateService.rateValue;
		const date = this._discountDateService.discountDateValue;
		const bill = this._discountBillService.billValue;
		const initialCosts = this._discountBillCostsService.initialCostsValue;
		const finalCosts = this._discountBillCostsService.finalCostsValue;

		const newDiscount = DiscountFormulasAdapter.discountBill(
			rate,
			bill,
			initialCosts,
			finalCosts,
			date
		);

		this._createNewDiscountService.setDiscount(newDiscount);
		this.updateDiscountPool();
		this._discountBillCostsService.restart();
	}

	public saveChanges(): void {}

	public ngOnDestroy() {
		this._suscriptions.forEach(x => x.unsubscribe());
	}
}
