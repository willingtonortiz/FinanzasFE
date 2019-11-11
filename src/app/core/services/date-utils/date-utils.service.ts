import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root"
})
export class DateUtilsService {
	constructor() {}

	public getAPIDateString(date: Date): string {
		return this.getCalendarDateString(date);
	}

	public getTodaysDate(): Date {
		return this.getDate(new Date());
	}

	public getDate(currentDate: Date): Date {
		return new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			currentDate.getDate()
		);
	}

	public getCalendarDateString(date: Date): string {
		let month: number | string = date.getMonth() + 1;
		let day: number | string = date.getDate();

		month = month > 9 ? `${month}` : `0${month}`;
		day = day > 9 ? `${day}` : `0${day}`;

		const dateString: string = `${date.getFullYear()}-${month}-${day}`;

		return dateString;
	}

	public getCalendarTodaysString(): string {
		return this.getCalendarDateString(new Date());
	}
}
