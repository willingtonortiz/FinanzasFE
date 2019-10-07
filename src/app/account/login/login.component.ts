import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "src/app/services/auth/auth.service";
import { Router } from "@angular/router";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";

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
		private auth: AuthService,
		private router: Router
	) {
		this.loginForm = this.formBuilder.group({
			username: "",
			password: ""
		});
	}

	onSubmit(data) {
		this.auth.loginUser(data).subscribe({
			next: res => {
				localStorage.setItem("token", res.token);
				this.router.navigate(["/userView"]);
			},
			error: (res: HttpErrorResponse) => {
				this.errorMessage = res.error.message;
			}
		});
	}

	ngOnInit() {}
}
