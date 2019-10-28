import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { User } from "src/app/shared/models";

@Injectable({
	providedIn: "root"
})
export class UserService {
	constructor(private http: HttpClient) {}

	public findAll(): Observable<User[]> {
		return this.http.get<User[]>(`${environment.apiUrl}/user`);
	}

	public findById(id: number): Observable<User> {
		return this.http.get<User>(`${environment.apiUrl}/user/${id}`);
	}
}
