import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { AuthenticationService } from "src/app/_services";

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
		private authenticationService: AuthenticationService,
		private router: Router
	) {
		this.loginForm = this.formBuilder.group({
			username: "",
			password: ""
		});
	}

	ngOnInit() {}

	onSubmit(data) {
		this.authenticationService.register(data).subscribe({
			next: (res: any) => {
				this.router.navigate(["/userView"]);
			},
			error: (res: HttpErrorResponse) => {
				this.errorMessage = res.error.message;
			}
		});
	}
}
