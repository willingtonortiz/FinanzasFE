import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "src/app/shared/models";
import { environment } from "../../../environments/environment";
import { RegisterUser } from "src/app/shared/dtos/registerUser";
import { UserCredentials } from "src/app/shared/dtos";

@Injectable({
	providedIn: "root"
})
export class AuthenticationService {
	private currentUserSubject: BehaviorSubject<UserCredentials>;
	public currentUser: Observable<UserCredentials>;

	constructor(private http: HttpClient) {
		this.currentUserSubject = new BehaviorSubject<UserCredentials>(
			JSON.parse(localStorage.getItem("currentUser"))
		);
		this.currentUser = this.currentUserSubject.asObservable();
	}

	public get currentUserValue(): UserCredentials {
		return this.currentUserSubject.value;
	}

	public login(username: string, password: string): Promise<UserCredentials> {
		return this.http
			.post<UserCredentials>(
				`${environment.apiUrl}/authentication/login`,
				{
					username,
					password
				}
			)
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
			.toPromise<UserCredentials>();
	}

	public logout(): void {
		localStorage.removeItem("currentUser");
		this.currentUserSubject.next(null);
	}

	public register(user: RegisterUser) {
		return this.http
			.post<any>(`${environment.apiUrl}/authentication/register`, user)
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
