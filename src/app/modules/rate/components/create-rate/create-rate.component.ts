import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { CurrencyType, RateType, RateTerm, Rate } from "src/app/shared/models";
import { DiscountPoolRateService } from "src/app/core/services";

@Component({
	selector: "app-create-rate",
	templateUrl: "./create-rate.component.html",
	styleUrls: ["./create-rate.component.scss"]
})
export class CreateRateComponent implements OnInit {
	public rateForm: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private discountPoolRateService: DiscountPoolRateService,
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

		const formData = this.rateForm.value;

		// Falta trabajar con tasas nominales { capitalizationDays }
		const rate: Rate = {
			businessName: "NONE",
			capitalizationDays: 360,
			currency: formData.currency,
			rateValue: parseFloat(formData.rateTerm),
			rateTerm: formData.rateTerm,
			rateType: formData.rateType
		};

		this.discountPoolRateService.setRate(rate);
		console.log(rate);

		this.router.navigate(["/discount"]);
	}
}
