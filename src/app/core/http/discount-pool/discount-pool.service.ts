import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DiscountPool } from "src/app/shared/models";
import { environment } from "src/environments/environment";
import { CreateDiscountPool } from "src/app/shared/dtos/output";
import { DiscountPoolInput } from "src/app/shared/dtos/input/DiscountPoolInput";

@Injectable({
	providedIn: "root"
})
// Permite la conexion a la base de datos del descuento
export class DiscountPoolService {
	constructor(private httpClient: HttpClient) {}

	public createDiscountPool(
		discountPool: CreateDiscountPool
	): Promise<DiscountPool> {
		return this.httpClient
			.post<DiscountPool>(
				`${environment.apiUrl}/discountspool`,
				discountPool
			)
			.toPromise<DiscountPool>();
	}

	public findDiscountsPoolByPymeId(pymeId: number): Promise<DiscountPool[]> {
		return this.httpClient
			.get<DiscountPool[]>(
				`${environment.apiUrl}/pymes/${pymeId}/discountspool`
			)
			.toPromise<DiscountPool[]>();
	}

	public findDiscountPoolById(
		discountPoolId: number
	): Promise<DiscountPoolInput> {
		return this.httpClient
			.get<DiscountPoolInput>(
				`${environment.apiUrl}/discountspool/${discountPoolId}`
			)
			.toPromise<DiscountPoolInput>();
	}

	public findCompleteDiscountPoolById(
		discountPoolId: number
	): Promise<DiscountPool> {
		return null;
	}
}
