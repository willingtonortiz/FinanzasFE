import { Component, OnInit } from "@angular/core";
import {
	FormGroup,
	FormBuilder,
	Validators,
	AbstractControl
} from "@angular/forms";
import { Router } from "@angular/router";

import { Rate } from "src/app/shared/models";
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
			currency: ["1", Validators.required],
			rateType: ["2", Validators.required],
			capitalizationTerm: ["8"],
			rateTerm: ["8", Validators.required],
			rateValue: [
				"0.00",
				Validators.compose([
					Validators.required,
					Validators.min(0.0000001),
					Validators.pattern(/^\d+\.?\d*$/)
				])
			]
		});

		this.rateForm.get("rateType").valueChanges.subscribe({
			next: (data: string) => {
				const capitalizationTerm = this.rateForm.get(
					"capitalizationTerm"
				);

				if (data === "1") {
					capitalizationTerm.setValidators(Validators.required);
				} else {
					capitalizationTerm.clearValidators();
				}
			}
		});
	}

	public onSubmit() {
		if (this.rateForm.invalid) {
			this.markFieldsAsDirty();
			return;
		}

		const capitalizationTerm: number = parseInt(
			this.capitalizationTerm.value
		);
		const currencyCode: number = parseInt(this.currency.value);
		const rateValue: number = parseFloat(this.rateValue.value) / 100;
		const rateTerm: number = parseInt(this.rateTerm.value);
		const rateType: number = parseInt(this.rateType.value);

		// [IGNORAR] [NO_BORRAR]
		// Se podrian crear dos tipos de Rates
		// Siguiente versión

		const rate: Rate = {
			businessName: "Personalizado",
			capitalizationTerm: capitalizationTerm,
			currencyCode: currencyCode,
			rateValue: rateValue,
			rateTerm: rateTerm,
			rateType: rateType
		};

		this.discountPoolRateService.setRate(rate);
		console.log(rate);

		this.router.navigate(["/discount"]);
	}

	public markFieldsAsDirty(): void {
		this.rateValue.markAsDirty();
	}

	public get rateType(): AbstractControl {
		return this.rateForm.get("rateType");
	}

	public get capitalizationTerm(): AbstractControl {
		return this.rateForm.get("capitalizationTerm");
	}

	public get currency(): AbstractControl {
		return this.rateForm.get("currency");
	}

	public get rateTerm(): AbstractControl {
		return this.rateForm.get("rateTerm");
	}

	public get rateValue(): AbstractControl {
		return this.rateForm.get("rateValue");
	}
}
