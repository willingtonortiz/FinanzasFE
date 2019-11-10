import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder, AbstractControl } from "@angular/forms";
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
	) {
		if (this.authenticationService.currentUserValue) {
			this.router.navigate(["/home"]);
		}
	}

	ngOnInit() {
		this.registerForm = this.formBuilder.group({
			ruc: [
				"",
				Validators.compose([
					Validators.required,
					Validators.min(10000000000),
					Validators.max(99999999999),
					Validators.pattern(/^20/)
				])
			],
			businessName: ["", [Validators.required]],
			address: ["", [Validators.required]],
			password: ["", [Validators.required]],
			confirmPassword: ["", [Validators.required]]
		});
	}

	onSubmit() {
		if (this.registerForm.invalid && this.isInvalid()) {
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
				this.router.navigate(["/home"]);
			},
			error: (res: any) => {
				console.log(res);
				// this.errorMessage = res.error.message;
			}
		});
	}

	public isInvalid():boolean {
		const data = this.registerForm.value;
		console.log(data);
		console.log("confirm password");
		if (data.password !== data.confirmPassword) {
			console.log("no son iguales");
			return true;
		}
		return false;
	}

	public get fbusinessName(): AbstractControl {
		return this.registerForm.get("businessName");
	}

	public get fpassword(): AbstractControl {
		return this.registerForm.get("password");
	}

	public get fconfirmPassword(): AbstractControl {
		return this.registerForm.get("confirmPassword");
	}

	public get fruc(): AbstractControl {
		return this.registerForm.get("ruc");
	}

	public get faddress(): AbstractControl {
		return this.registerForm.get("address");
	}
}
