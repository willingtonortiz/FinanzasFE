import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DiscountPool } from "src/app/shared/models";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root"
})
export class DiscountPoolService {
	constructor(private httpClient: HttpClient) {}

	public createDiscountPool(discountPool: DiscountPool): Promise<DiscountPool> {
		return this.httpClient
			.post<DiscountPool>(
				`${environment.apiUrl}/discountpool`,
				discountPool
			)
			.toPromise<DiscountPool>();
	}
}
