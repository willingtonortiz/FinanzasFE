import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Bill } from "src/app/_models";
import { environment } from "src/environments/environment.prod";

@Injectable({
	providedIn: "root"
})
export class BillService {
	constructor(private http: HttpClient) {}

	public findAllByRuc(ruc: string): Observable<Bill[]> {
		return this.http.get<Bill[]>(`${environment.apiUrl}/bill/${ruc}`);
	}
}
