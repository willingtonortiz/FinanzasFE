import { Injectable } from "@angular/core";

import { Pyme } from "src/app/shared/models";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root"
})
export class PymeHttpService {
	constructor(private httpClient: HttpClient) {}

	public findById(pymeId: number): Promise<Pyme> {
		return this.httpClient
			.get<Pyme>(`${environment.apiUrl}/pymes/${pymeId}`)
			.toPromise<Pyme>();
	}
}
