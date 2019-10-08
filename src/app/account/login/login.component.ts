import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { AuthenticationService } from "src/app/services/";
import { first } from "rxjs/operators";

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
			this.router.navigate(["/"]);
		}
	}

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			username: ["", Validators.required],
			password: ["", Validators.required]
		});
	}

	onSubmit(data) {
		if (this.loginForm.invalid) {
			return;
		}
		const { username, password } = data;

		this.authenticationService
			.login(username, password)
			.pipe(first())
			.subscribe({
				next: res => {
					this.router.navigate(["/userView"]);
				},
				error: (res: HttpErrorResponse) => {
					this.errorMessage = res.error.message;
				}
			});
	}
}
