import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class SelectBillService {
	// Para mostrar el modal
	private displaySubject: BehaviorSubject<boolean>;
	private display: Observable<boolean>;

	private pageSubject: BehaviorSubject<number>;
	private page: Observable<number>;

	// Para mostrar la página

	constructor() {
		this.displaySubject = new BehaviorSubject<boolean>(false);
		this.display = this.displaySubject.asObservable();

		this.pageSubject = new BehaviorSubject<number>(1);
		this.page = this.pageSubject.asObservable();
	}

	// Para el modal
	public show() {
		this.displaySubject.next(true);
	}

	public hide() {
		this.displaySubject.next(false);
	}

	get Display(): Observable<boolean> {
		return this.display;
	}

	// Para la página
	public setPage(page: number) {
		this.pageSubject.next(page);
	}

	get Page(): Observable<number> {
		return this.page;
	}
}
