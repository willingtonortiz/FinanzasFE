import { Injectable } from "@angular/core";
import { DiscountPoolService } from "src/app/core/http";
import { BehaviorSubject, Observable } from "rxjs";
import { DiscountPoolInput } from "src/app/shared/dtos/input/DiscountPoolInput";

@Injectable({
	providedIn: "root"
})
export class DiscountedDiscountPoolService {
	private _discountPoolSubject: BehaviorSubject<DiscountPoolInput>;
	// private _discountPoolObservable: Observable<DiscountPoolInput>;

	constructor(private _discountPoolHttpService: DiscountPoolService) {
		this._discountPoolSubject = new BehaviorSubject<DiscountPoolInput>({});

		// this._discountPoolObservable = this._discountPoolSubject.asObservable();
	}

	public async fetchById(discountPoolId: number): Promise<void> {
		try {
			const discountPool: DiscountPoolInput = await this._discountPoolHttpService.findDiscountPoolById(
				discountPoolId
			);
			this._discountPoolSubject.next(discountPool);
		} catch (error) {
			console.log("ERROR => DISCOUNTED BILL SERVICE => FIND BY ID");
		}
	}

	public get discountPoolValue(): DiscountPoolInput {
		return this._discountPoolSubject.value;
	}
}
