import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";
import { Observable } from "rxjs";
import { Bank } from "src/app/_models";

@Injectable({
	providedIn: "root"
})
export class BankService {
	constructor(private httpClient: HttpClient) {}

	public findAll(): Observable<Bank[]> {
		return this.httpClient.get<Bank[]>(`${environment.apiUrl}/banks`);
	}
}
