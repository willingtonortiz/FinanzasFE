import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Record } from "src/app/shared/models";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class RecordService {

	constructor(private http: HttpClient) {}

	public findByUserId(userId: number): Promise<Record[]> {
		return this.http
			.get<Record[]>(`${environment.apiUrl}/users/${userId}/records`)
			.pipe(
				map((records: Record[]) => {
					records.forEach(x => {
						x.date = new Date(x.date);
						//x.endDate = new Date(x.endDate);
					});
					return records;
				})
			)
			.toPromise<Record[]>();
	}

	public createRecord(record: Record): Promise<Record> {
		return this.http
			.post<Record>(`${environment.apiUrl}/records`, record)
			.toPromise<Record>();
	}
}
