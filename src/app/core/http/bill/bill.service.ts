import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Bill } from "src/app/shared/models";
import { CreateBill } from "src/app/shared/dtos/output";

@Injectable({
	providedIn: "root"
})
export class BillService {
	constructor(private http: HttpClient) {}

	public findByUserId(userId: number): Promise<Bill[]> {
		return this.http
			.get<Bill[]>(`${environment.apiUrl}/users/${userId}/bills`)
			.toPromise<Bill[]>();
	}

	public findById(id: number): Promise<Bill> {
		return this.http
			.get<Bill>(`${environment.apiUrl}/bills/${id}`)
			.toPromise<Bill>();
	}

	public create(bill: CreateBill): Promise<Bill> {
		return this.http
			.post<Bill>(`${environment.apiUrl}/bills`, bill)
			.toPromise<Bill>();
	}
}
