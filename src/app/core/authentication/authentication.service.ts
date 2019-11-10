import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { RegisterUser } from "src/app/shared/dtos/registerUser";
import { UserCredentials } from "src/app/shared/dtos";
import { Router } from "@angular/router";
import { Pyme } from "src/app/shared/models";
import { PymeHttpService } from "../http";

@Injectable({
	providedIn: "root"
})
export class AuthenticationService {
	private currentUserSubject: BehaviorSubject<UserCredentials>;
	public currentUser: Observable<UserCredentials>;

	constructor(
		private http: HttpClient,
		private _router: Router,
		private _pymeHttpService: PymeHttpService
	) {
		this.currentUserSubject = new BehaviorSubject<UserCredentials>(
			JSON.parse(localStorage.getItem("currentUser"))
		);
		this.currentUser = this.currentUserSubject.asObservable();
	}

	public get currentUserValue(): UserCredentials {
		return this.currentUserSubject.value;
	}

	// TODO: Abstraer los servicios relacionados a datos del usuario
	// en un nuevo servicio que los provea de manera más sencilla
	// UserDataService?
	// O mover el metodo a PymeHttpService
	public async getCurrentPyme(): Promise<Pyme> {
		try {
			const pyme: Pyme = await this._pymeHttpService.findById(
				this.currentUserValue.id
			);
			return pyme;
		} catch (error) {
			console.log("ERROR IN AUTHENTICATION_SERVICE : GET_CURRENT_PYME");
			return null;
		}
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
		this._router.navigate(["account/login"]);
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
