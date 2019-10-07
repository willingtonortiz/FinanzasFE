import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { AuthService } from "src/app/services/auth/auth.service";
import { Router } from "@angular/router";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";

@Component({
	selector: "app-register",
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
	public loginForm: FormGroup;
	public errorMessage: string = "";

	constructor(
		private formBuilder: FormBuilder,
		private auth: AuthService,
		private router: Router
	) {
		this.loginForm = this.formBuilder.group({
			username: "",
			password: ""
		});
	}

	ngOnInit() {}

	onSubmit(data) {
		this.auth.registerUser(data).subscribe({
			next: (res: any) => {
				localStorage.setItem("token", res.token);
				this.router.navigate(["/userView"]);
			},
			error: (res: HttpErrorResponse) => {
				this.errorMessage = res.error.message;
			}
		});
	}
}
