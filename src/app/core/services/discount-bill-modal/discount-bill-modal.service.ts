import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class DiscountBillModalService {
	private displaySubject: BehaviorSubject<boolean>;
	private display: Observable<boolean>;

	private pageSubject: BehaviorSubject<number>;
	private page: Observable<number>;

	constructor() {
		this.displaySubject = new BehaviorSubject<boolean>(false);
		this.display = this.displaySubject.asObservable();

		this.pageSubject = new BehaviorSubject<number>(1);
		this.page = this.pageSubject.asObservable();
	}

	public restart(): void {
		this.hide();
		this.setPage(1);
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
