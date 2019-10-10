import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
	selector: "app-create-rate",
	templateUrl: "./create-rate.component.html",
	styleUrls: ["./create-rate.component.scss"]
})
export class CreateRateComponent implements OnInit {
	public rateForm: FormGroup;

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit() {
		this.rateForm = this.formBuilder.group({});
	}
}
