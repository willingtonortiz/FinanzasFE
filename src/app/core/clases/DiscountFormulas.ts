import { Rate } from "../../shared/models";
import { RateTermConverter } from "src/app/shared/Utils";
import { RateType } from "src/app/shared/enums";

export class DiscountFormulas {
	public constructor() {}

	public static daysBetween(startTime: Date, endTime: Date): number {
		const days =
			(endTime.getTime() - startTime.getTime()) / (1000 * 3600 * 24);

		// console.log(startTime);
		// console.log(endTime);

		return days;
	}

	public static computeEfectiveRate(
		discountDays: number,
		rate: Rate
	): number {
		let tep: number;
		const days: number = RateTermConverter.fromString(rate.rateTerm);

		if (rate.rateType === RateType.EFFECTIVE) {
			tep = Math.pow(1.0 + rate.rateValue, discountDays / days) - 1;

			// Si es nominal
		} else {
			tep =
				Math.pow(1 + rate.rateValue / rate.capitalizationDays, days) -
				1;
		}

		return tep;
	}

	public static discountRate(tep: number): number {
		return tep / (tep + 1);
	}

	public static discount(nominalValue: number, discountRate: number): number {
		return nominalValue * discountRate;
	}

	public static netValue(nominalValue: number, discountRate: number): number {
		return nominalValue * (1 - discountRate);
	}

	public static receivedValue(
		nominalValue: number,
		retention: number,
		initialCost: number
	) {
		return nominalValue - retention - initialCost;
	}

	public static deliveredValue(
		nominalValue: number,
		retention: number,
		finalCost: number
	): number {
		return nominalValue - retention + finalCost;
	}

	public static billTcea(
		deliveredValue: number,
		receivedValue: number,
		discountDays: number
	) {
		return Math.pow(deliveredValue / receivedValue, 360 / discountDays) - 1;
	}

	public static averageDays(
		netValues: number[],
		discounts: number[],
		tepValues: number[],
		nominalValues: number[],
		size: number
	) {
		let dividend: number = 0;
		let divider: number = 0;

		for (let i = 0; i < size; i++) {
			dividend += netValues[i] * discounts[i];
			divider += nominalValues[i] * (1 - tepValues[i]);
		}

		return dividend / divider;
	}

	public static discountPoolTcea(
		receivedValue: number,
		deliveredValue: number,
		discountDays: number,
		size: number
	): number {
		return Math.pow(
			receivedValue / deliveredValue,
			(360 * size) / discountDays
		);
	}
}
