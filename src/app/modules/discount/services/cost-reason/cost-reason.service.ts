import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Cost } from "src/app/shared/models";

@Injectable({
	providedIn: "root"
})

// TODO: Cambiar el nombre de esta clase => Futura versión
export class CostReasonService {
	private _costReasonSubject: Subject<Cost>;
	private _costReasonObservable: Observable<Cost>;

	constructor() {
		this._costReasonSubject = new Subject<Cost>();
		this._costReasonObservable = this._costReasonSubject.asObservable();
	}

	public get costReasonObservable(): Observable<Cost> {
		return this._costReasonObservable;
	}

	public setCostReason(reason: Cost): void {
		this._costReasonSubject.next(reason);
	}
}
