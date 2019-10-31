import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

import { RegisterUser } from "src/app/shared/dtos/registerUser";
import { AuthenticationService } from "src/app/core/authentication";

@Component({
	selector: "app-register",
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
	public registerForm: FormGroup;
	public errorMessage: string = "";

	constructor(
		private formBuilder: FormBuilder,
		private authenticationService: AuthenticationService,
		private router: Router
	) { }

	ngOnInit() {
		this.registerForm = this.formBuilder.group({
			ruc: [
				"",
				Validators.compose([
					Validators.required,
					Validators.min(20000000000),
					Validators.max(20999999999)
				])
			],
			businessName: ["", [Validators.required]],
			address: ["", [Validators.required]],
			password: ["", [Validators.required]],
			confirmPassword: ["", [Validators.required]]
		});
	}

	onSubmit() {
		if (this.registerForm.invalid) {
			console.log("Is invalid");
			console.log(this.registerForm);
			console.log(this.registerForm.errors);
			return;
		}
		const data = this.registerForm.value;

		const user: RegisterUser = {
			username: data.ruc.toString(),
			password: data.password,
			address: data.address,
			businessName: data.businessName
		};

		this.authenticationService.register(user).subscribe({
			next: (res: any) => {
				this.router.navigate(["/userView"]);
			},
			error: (res: any) => {
				console.log(res);
				// this.errorMessage = res.error.message;
			}
		});
	}

	public isInvalid(data) {
		if (data.password !== data.confirmPassword) {
			return true;
		}
		return false;
	}
}
