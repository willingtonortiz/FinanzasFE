import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";
import { map } from "rxjs/operators";

@Injectable({
	providedIn: "root"
})
export class UtilService {
	constructor(private httpClient: HttpClient) {}

	public billTcea(data: {
		deliveredValue: number;
		receivedValue: number;
		discountDays: number;
	}): Promise<number> {
		return this.httpClient
			.post<number>(`${environment.apiUrl}/api/utils/billtcea`, data)
			.pipe(
				map((data: any) => {
					console.log(data);
					return data.value;
				})
			)
			.toPromise<number>();
	}
}
