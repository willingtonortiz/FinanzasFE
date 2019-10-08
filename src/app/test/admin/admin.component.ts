import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user/user.service";
import { User } from "src/app/_models";
import { first } from "rxjs/operators";

@Component({
	selector: "app-admin",
	templateUrl: "./admin.component.html",
	styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {
	public users: User[] = [];

	constructor(private userService: UserService) {}

	ngOnInit() {
		this.userService
			.findAll()
			.pipe(first())
			.subscribe(users => {
				this.users = users;
			});
	}

	getData() {
		this.userService.findAll().subscribe({
			next: data => {
				console.log(data);
			},
			error: err => {
				console.log(err);
			}
		});
	}
}
