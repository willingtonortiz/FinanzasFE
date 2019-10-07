import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user/user.service";

@Component({
	selector: "app-admin",
	templateUrl: "./admin.component.html",
	styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {
	constructor(private userService: UserService) {}

	ngOnInit() {}

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
