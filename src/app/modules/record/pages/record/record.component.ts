import { Component, OnInit, ɵConsole } from '@angular/core';
import { Record } from 'src/app/shared/models';
import { RecordService } from 'src/app/core/http/record/record.service';
import { AuthenticationService } from 'src/app/core/authentication';
import { UserCredentials } from 'src/app/shared/dtos';
import { Location } from "@angular/common";

@Component({
	selector: 'app-record',
	templateUrl: './record.component.html',
	styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
	public records: Record[];
	public objectKeys = Object.keys;
	private currentUser: UserCredentials;
	private historial: Map<string, any>;
	constructor(
		private _recordService: RecordService,
		private _authenticationService: AuthenticationService,
		private _location: Location
	) {
		this.currentUser = this._authenticationService.currentUserValue;
	}

	async ngOnInit() {
		this.records = await this._recordService.findByUserId(this.currentUser.id);

		this.historial = new Map();


		this.records.forEach(r => {

			let date: string = r.date.getDate() + " de " + this.NameMonth(r.date.getMonth()) + " de " + r.date.getUTCFullYear();

			let h: string;
			if (r.date.getHours() < 5)
				h = (r.date.getHours() + 19).toString();
			else
				if (r.date.getHours() < 15)
					h = "0" + (r.date.getHours() - 5).toString();
				else
					h = (r.date.getHours() - 5).toString();
			let m: string;
			if (r.date.getMinutes() < 10)
				m = "0" + r.date.getMinutes();
			else
				m = r.date.getMinutes().toString();
			let time: string = h + ":" + m;

			var hist: [string, String] = [time, r.message];

			if (this.historial.has(date)) {
				let arr = this.historial.get(date);
				arr.push(hist);
				this.historial.set(date, arr);
			}
			else {

				this.historial.set(date, new Array(hist));
			}

		})

		console.log(this.historial);
		//console.log(this.records);
	}

	private NameMonth(index: number): string {
		switch (index) {
			case 1: return "enero";
			case 2: return "febrero";
			case 3: return "marzo";
			case 4: return "abril";
			case 5: return "mayo";
			case 6: return "junio";
			case 7: return "julio";
			case 8: return "agosto";
			case 9: return "setiembre";
			case 10: return "octubre";
			case 11: return "noviembre";
			case 12: return "diciembre";
		}
	}
	public goBack() {
		this._location.back();
	}

}
