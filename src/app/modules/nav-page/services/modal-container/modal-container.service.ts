import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class ModalContainerService {
	private _isActiveSubject: BehaviorSubject<boolean>;
	private _isActiveObservable: Observable<boolean>;

	private _modalIdSubject: BehaviorSubject<number>;
	private _modalIdObservable: Observable<number>;

	constructor() {
		this._isActiveSubject = new BehaviorSubject<boolean>(true);
		this._isActiveObservable = this._isActiveSubject.asObservable();

		this._modalIdSubject = new BehaviorSubject<number>(1);
		this._modalIdObservable = this._modalIdSubject.asObservable();
	}

	public get isActiveValue(): boolean {
		return this._isActiveSubject.value;
	}

	public get isActiveObservable(): Observable<boolean> {
		return this._isActiveObservable;
	}

	public get modalIdValue(): number {
		return this._modalIdSubject.value;
	}

	public get modalIdObservable(): Observable<number> {
		return this._modalIdObservable;
	}

	public openModalWithId(id: number): void {
		this.setModalId(id);
		this.openModal();
	}

	public setModalId(id: number): void {
		this._modalIdSubject.next(id);
	}

	public openModal(): void {
		this._isActiveSubject.next(true);
	}

	public closeModal(): void {
		this._isActiveSubject.next(false);
	}
}
