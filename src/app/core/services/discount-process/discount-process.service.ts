import { Injectable, OnDestroy } from "@angular/core";
import { DiscountPoolRateService } from "../discount-pool-rate/discount-pool-rate.service";
import { CreateNewDiscountService } from "../create-new-discount/create-new-discount.service";
import { DiscountBillService } from "../discount-bill/discount-bill.service";
import { DiscountBillCostsService } from "../discount-bill-costs/discount-bill-costs.service";
import { DiscountPoolDataService } from "../discounts-pool-data/discount-pool-data.service";
import { DiscountsListService } from "../discounts-list/discounts-list.service";
import { Subscription } from "rxjs";
import { DiscountDateService } from "../discount-date/discount-date.service";
import {
	Discount,
	Cost,
	DiscountPool,
	Rate,
	Bill
} from "src/app/shared/models";
import { DiscountFormulasAdapter } from "../../clases";
import { CostType } from "src/app/shared/enums";
import {
	CreateDiscountPool,
	CreateDiscount,
	CreateCost
} from "src/app/shared/dtos/output";
import { AuthenticationService } from "../../authentication";
import { UserCredentials } from "src/app/shared/dtos";
import { DiscountPoolService } from "../../http";
import { DateUtilsService } from "../date-utils/date-utils.service";

@Injectable({
	providedIn: "root"
})
// Maneja el descuento de la cartera de letras
export class DiscountProcessService implements OnDestroy {
	private _suscriptions: Array<Subscription>;

	// TODO: Falta agregar la retención en la letra
	public constructor(
		private _discountPoolHttpService: DiscountPoolService,
		private _createNewDiscountService: CreateNewDiscountService,
		private _discountPoolRateService: DiscountPoolRateService,
		private _discountBillService: DiscountBillService,
		private _discountBillCostsService: DiscountBillCostsService,
		private _discountPoolDataService: DiscountPoolDataService,
		private _discountListService: DiscountsListService,
		private _discountDateService: DiscountDateService,
		private _authenticationService: AuthenticationService,
		private _dateUtilsService: DateUtilsService
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
		const retention: number = this._discountBillCostsService.retentionValue;

		discounts = discounts.map((x: Discount) =>
			DiscountFormulasAdapter.discountBill(
				rate,
				x.bill,
				x.costs.filter((y: Cost) => y.costType === CostType.INITIAL),
				x.costs.filter((y: Cost) => y.costType === CostType.FINAL),
				date,
				retention
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

		this._discountPoolDataService.reset();
		discounts.forEach((x: Discount) => {
			discountPool.receivedValue += x.receivedValue;
			discountPool.deliveredValue += x.deliveredValue;
			this._discountPoolDataService.setMaximumDiscountDate(x.bill.endDate);
			this._discountPoolDataService.setMinimumDiscountDate(x.bill.startDate);
		});

		discountPool.tcea = DiscountFormulasAdapter.discountPoolTcea(
			discountPool,
			this._discountListService.discountsValue
		);

		this._discountPoolDataService.setDiscountPool(discountPool);
	}

	public discountCurrentBill() {
		const rate: Rate = this._discountPoolRateService.rateValue;
		const date: Date = this._discountDateService.discountDateValue;
		const bill: Bill = this._discountBillService.billValue;
		const initialCosts: Cost[] = this._discountBillCostsService
			.initialCostsValue;
		const finalCosts: Cost[] = this._discountBillCostsService
			.finalCostsValue;
		const retention: number = this._discountBillCostsService.retentionValue;

		const newDiscount = DiscountFormulasAdapter.discountBill(
			rate,
			bill,
			initialCosts,
			finalCosts,
			date,
			retention
		);

		this._createNewDiscountService.setDiscount(newDiscount);
		this.updateDiscountPool();
		this._discountBillCostsService.restart();
	}

	public async saveDiscountPool() {
		const discountPool: DiscountPool = this._discountPoolDataService
			.discountPoolValue;
		const discountDate: Date = this._discountDateService.discountDateValue;
		const currentUser: UserCredentials = this._authenticationService
			.currentUserValue;
		const discounts: Discount[] = this._discountListService.discountsValue;
		const rate: Rate = this._discountPoolRateService.rateValue;

		const dateString = this._dateUtilsService.getAPIDateString(
			discountDate
		);

		// Creando la cartera
		let bankId: number = this._discountPoolRateService.rateValue.id;
		const createDiscountPool: CreateDiscountPool = {
			bankId: bankId,
			deliveredValue: discountPool.deliveredValue,
			receivedValue: discountPool.receivedValue,
			tcea: discountPool.tcea,
			discountDate: dateString,
			currencyCode: rate.currencyCode,
			pymeId: currentUser.id
		};

		const createDiscounts: CreateDiscount[] = [];

		// Creando los descuentos
		discounts.forEach(x => {
			const newDiscount: CreateDiscount = {
				billId: x.bill.id,
				deliveredValue: x.deliveredValue,
				receivedValue: x.receivedValue,
				discountDays: x.discountDays,
				discountRate: x.discountRate,
				finalCost: x.finalCost,
				initialCost: x.initialCost,
				netValue: x.netValue,
				retention: x.retention,
				tcea: x.tcea,
				tep: x.tep
			};

			// Creando los costos
			const costs: CreateCost[] = [];
			x.costs.forEach(y => {
				const newCost: CreateCost = {
					amount: y.amount,
					costType: y.costType,
					currencyCode: y.currencyCode,
					paymentType: y.paymentType,
					reason: y.reason
				};

				costs.push(newCost);
			});

			newDiscount.costs = costs;

			createDiscounts.push(newDiscount);
		});

		createDiscountPool.discounts = createDiscounts;

		try {
			await this._discountPoolHttpService.createDiscountPool(
				createDiscountPool
			);
		} catch (error) {
			console.log(error);
		}
	}


	public saveChanges(): void {}

	public cancelDiscount(): void {
		this._discountListService.restart();
	}

	public ngOnDestroy() {
		this._suscriptions.forEach(x => x.unsubscribe());
	}
}
