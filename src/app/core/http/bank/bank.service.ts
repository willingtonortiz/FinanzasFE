import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";
import { Observable } from "rxjs";
import { Bank } from "src/app/shared/models";

@Injectable({
	providedIn: "root"
})
export class BankService {
	constructor(private httpClient: HttpClient) {}

	public findAll(): Promise<Bank[]> {
		return this.httpClient
			.get<Bank[]>(`${environment.apiUrl}/banks`)
			.toPromise<Bank[]>();
	}
}
