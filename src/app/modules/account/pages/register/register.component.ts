import { Component, OnInit } from "@angular/core";
import {
	FormGroup,
	Validators,
	FormBuilder,
	AbstractControl
} from "@angular/forms";
import { Router } from "@angular/router";

import { RegisterUser } from "src/app/shared/dtos/registerUser";
import { AuthenticationService } from "src/app/core/authentication";
import { UserCredentials } from "src/app/shared/dtos";

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
					Validators.minLength(11),
					Validators.maxLength(11),
					Validators.pattern(/20\d{9}/)
				])
			],
			businessName: ["", [Validators.required]],
			address: ["", [Validators.required]],
			password: ["", [Validators.required, Validators.minLength(8)]],
			confirmPassword: ["", [Validators.required]]
		});
	}

	public async onSubmit() {
		if (this.registerForm.invalid || !this.passwordMatches()) {
			this.showErrors();
			return;
		}

		const user: RegisterUser = {
			username: this.fruc.value,
			password: this.fPassword.value,
			address: this.faddress.value,
			businessName: this.fbusinessName.value
		};

		try {
			const newUser: UserCredentials = await this.authenticationService.register(
				user
			);
			this.router.navigate(["/home"]);
		} catch (error) {
			this.errorMessage = "El RUC ya existe";
		}
	}

	public showErrors(): void {
		this.fruc.markAsDirty();
		this.fbusinessName.markAsDirty();
		this.faddress.markAsDirty();
		this.fPassword.markAsDirty();
		this.fConfirmPassword.markAsDirty();
	}

	public passwordMatches(): boolean {
		if (this.fPassword.value === this.fConfirmPassword.value) {
			return true;
		}
		return false;
	}

	public get fbusinessName(): AbstractControl {
		return this.registerForm.get("businessName");
	}

	public get fPassword(): AbstractControl {
		return this.registerForm.get("password");
	}

	public get fConfirmPassword(): AbstractControl {
		return this.registerForm.get("confirmPassword");
	}

	public get fruc(): AbstractControl {
		return this.registerForm.get("ruc");
	}

	public get faddress(): AbstractControl {
		return this.registerForm.get("address");
	}
}
