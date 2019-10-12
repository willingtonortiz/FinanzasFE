import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Discount, CurrencyType, RateType, RateTerm } from "src/app/_models";
import { DiscountService } from "src/app/_services";

@Component({
	selector: "app-create-rate",
	templateUrl: "./create-rate.component.html",
	styleUrls: ["./create-rate.component.scss"]
})
export class CreateRateComponent implements OnInit {
	public rateForm: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private discountService: DiscountService
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

		const discount: Discount = this.rateForm.value;
		discount.rateValue = parseFloat(discount.rateValue.toString());

		this.discountService.Discount = discount;
	}
}
