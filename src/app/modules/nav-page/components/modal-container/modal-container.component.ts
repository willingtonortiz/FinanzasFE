import { Component, OnInit } from "@angular/core";
import { ModalValue } from "../../enums";
import { ModalContainerService } from "../../services";

@Component({
	selector: "app-modal-container",
	templateUrl: "./modal-container.component.html",
	styleUrls: ["./modal-container.component.scss"]
})
export class ModalContainerComponent implements OnInit {
	public modalValue: ModalValue;

	constructor(private _modalContainerService: ModalContainerService) {
		this._modalContainerService.modalIdObservable.subscribe({
			next: (data: number) => {
				this.modalValue = data;
			}
		});
	}

	ngOnInit() {}
}
