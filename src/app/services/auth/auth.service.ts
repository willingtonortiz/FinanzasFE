import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	private loginUrl: string = "https://localhost:5001/user";

	constructor(private http: HttpClient) {}

	loginUser(user) {
		return this.http.post<any>(`${this.loginUrl}/authenticate`, user);
	}

	registerUser(user) {
		return this.http.post<any>(`${this.loginUrl}/register`, user);
	}

	isLoggedIn() {
		return localStorage.getItem("token") !== null;
	}

	getToken() {
		return localStorage.getItem("token");
	}
}
