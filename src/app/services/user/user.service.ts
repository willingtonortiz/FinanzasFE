import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
	providedIn: "root"
})
export class UserService {
	private userUrl: string = "https://localhost:5001/user";

	constructor(private http: HttpClient) {}

	public findAll() {
		return this.http.get<any>(`${this.userUrl}`);
	}
}
