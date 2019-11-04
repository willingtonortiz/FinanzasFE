import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { first } from "rxjs/operators";
import { AuthenticationService } from "src/app/core/authentication";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
	public loginForm: FormGroup;
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
		this.loginForm = this.formBuilder.group({
			username: [
				"",
				Validators.compose([
					Validators.required,
					Validators.minLength(11),
					Validators.maxLength(11)
				])
			],
			password: ["", Validators.required]
		});
	}

	async onSubmit() {
		if (this.loginForm.invalid) {
			return;
		}
		const { username, password } = this.loginForm.value;

		try {
			const data = await this.authenticationService.login(
				username,
				password
			);

			this.router.navigate(["/"]);
		} catch (error) {
			this.errorMessage = "Usuario o contraseña incorrectos";
			// console.log(error);
		}
	}
}
