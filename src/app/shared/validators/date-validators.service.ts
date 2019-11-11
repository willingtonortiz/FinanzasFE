import { Injectable } from "@angular/core";
import { ValidatorFn, AbstractControl } from "@angular/forms";
import { DateUtilsService } from "src/app/core/services";

@Injectable({
	providedIn: "root"
})
export class DateValidatorsService {
	public constructor(private _dateUtilsService: DateUtilsService) {}

	beforeDate(date: Date): ValidatorFn {
		return (
			control: AbstractControl
		): { [key: string]: boolean } | null => {
			const controlDate: Date = this._dateUtilsService.getDateFromCalendarDate(
				control.value
			);

			const controlMilliseconds = controlDate.getTime();
			const currentMilliseconds = date.getTime();

			if (controlMilliseconds > currentMilliseconds) {
				return { beforeDate: true };
			} else {
				return null;
			}
		};
	}

	afterDate(date: Date): ValidatorFn {
		return (
			control: AbstractControl
		): { [key: string]: boolean } | null => {
			const controlDate: Date = this._dateUtilsService.getDateFromCalendarDate(
				control.value
			);

			const controlMilliseconds = controlDate.getTime();
			const currentMilliseconds = date.getTime();

			if (controlMilliseconds < currentMilliseconds) {
				return { afterDate: true };
			} else {
				return null;
			}
		};
	}
}
