import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../../_models";
import { environment } from "../../../environments/environment";

@Injectable({
	providedIn: "root"
})
export class UserService {
	constructor(private http: HttpClient) {}

	public findAll() {
		return this.http.get<[]>(`${environment.apiUrl}/user`);
	}

	public findById(id: number) {
		return this.http.get<User>(`${environment.apiUrl}/user/${id}`);
	}
}
