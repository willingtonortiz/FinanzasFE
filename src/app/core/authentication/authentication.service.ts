import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "src/app/shared/models";
import { environment } from "../../../environments/environment";
import { RegisterUser } from "src/app/shared/dtos/registerUser";

@Injectable({
	providedIn: "root"
})
export class AuthenticationService {
	private currentUserSubject: BehaviorSubject<User>;
	public currentUser: Observable<User>;

	constructor(private http: HttpClient) {
		this.currentUserSubject = new BehaviorSubject<User>(
			JSON.parse(localStorage.getItem("currentUser"))
		);
		this.currentUser = this.currentUserSubject.asObservable();
	}

	public get currentUserValue(): User {
		return this.currentUserSubject.value;
	}

	public login(username: string, password: string): Promise<any> {
		return this.http
			.post<any>(`${environment.apiUrl}/authentication/login`, {
				username,
				password
			})
			.pipe(
				map(user => {
					if (user && user.token) {
						localStorage.setItem(
							"currentUser",
							JSON.stringify(user)
						);
						this.currentUserSubject.next(user);
					}

					return user;
				})
			)
			.toPromise<any>();
	}

	public logout() {
		localStorage.removeItem("currentUser");
		this.currentUserSubject.next(null);
	}

	public register(user: RegisterUser) {
		return this.http
			.post<any>(`${environment.apiUrl}/users/register`, user)
			.pipe(
				map(user => {
					if (user && user.token) {
						localStorage.setItem(
							"currentUser",
							JSON.stringify(user)
						);
						this.currentUserSubject.next(user);
					}

					return user;
				})
			);
	}
}
