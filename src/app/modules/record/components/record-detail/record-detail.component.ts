import { Component, OnInit, Input } from "@angular/core";

@Component({
	selector: "app-record-detail",
	templateUrl: "./record-detail.component.html",
	styleUrls: ["./record-detail.component.scss"]
})
export class RecordDetailComponent implements OnInit {
	@Input() historial: Array<any>;
	constructor() {}

	ngOnInit() {

	}
}
