import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { CurrencyType, RateType, RateTerm, Rate } from "src/app/shared/models";
import { DiscountService } from "src/app/core/services";

@Component({
	selector: "app-create-rate",
	templateUrl: "./create-rate.component.html",
	styleUrls: ["./create-rate.component.scss"]
})
export class CreateRateComponent implements OnInit {
	public rateForm: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private discountService: DiscountService,
		private router: Router
	) {}

	ngOnInit() {
		this.rateForm = this.formBuilder.group({
			currency: [CurrencyType.Soles, Validators.required],
			rateType: [RateType.Efectiva, Validators.required],
			rateTerm: [RateTerm.Anual, Validators.required],
			rateValue: [
				"0.00",
				Validators.compose([
					Validators.required,
					Validators.min(0),
					Validators.max(100)
				])
			]
		});
	}

	public onSubmit() {
		if (this.rateForm.invalid) {
			return;
		}

		const rate: Rate = this.rateForm.value;
		rate.rateValue = parseFloat(rate.rateValue.toString());

		this.discountService.Rate = rate;

		this.router.navigate(["/discount"]);
	}
}
