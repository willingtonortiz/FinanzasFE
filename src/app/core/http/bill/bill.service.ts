import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Bill } from "src/app/shared/models";

@Injectable({
	providedIn: "root"
})
export class BillService {
	constructor(private http: HttpClient) {}

	public findByUserId(id: number): Observable<Bill[]> {
		return this.http.get<Bill[]>(
			`${environment.apiUrl}/bills/FindByUserId/${id}`
		);
	}

	public findById(id: string): Observable<Bill> {
		return this.http.get<Bill>(`${environment.apiUrl}/bills/${id}`);
	}

	public create(bill: Bill) {
		return this.http.post<Bill>(`${environment.apiUrl}/bills`, bill);
	}
}
