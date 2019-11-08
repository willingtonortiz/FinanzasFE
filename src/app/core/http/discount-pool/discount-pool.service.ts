import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DiscountPool } from "src/app/shared/models";
import { environment } from "src/environments/environment";
import { CreateDiscountPool } from "src/app/shared/dtos/output";

@Injectable({
	providedIn: "root"
})
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
}
