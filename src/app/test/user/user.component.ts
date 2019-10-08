import { Component, OnInit } from "@angular/core";
import { User } from "src/app/_models";
import { UserService } from "src/app/services/user/user.service";
import { AuthenticationService } from "src/app/services";
import { first } from "rxjs/operators";

@Component({
	selector: "app-user",
	templateUrl: "./user.component.html",
	styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {
	public currentUser: User;
	public userFromApi: User;

	constructor(
		private userService: UserService,
		private authenticationService: AuthenticationService
	) {
		this.currentUser = this.authenticationService.currentUserValue;
	}

	ngOnInit() {
		this.userService
			.findById(this.currentUser.username)
			.pipe(first())
			.subscribe(user => {
				this.userFromApi = user;
			});
	}
}
