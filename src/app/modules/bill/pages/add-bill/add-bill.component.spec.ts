import { ComponentFixture, TestBed, async } from "@angular/core/testing";

import { AddBillComponent } from "./add-bill.component";

describe("AddBillComponent", () => {
	let component: AddBillComponent;
	let fixture: ComponentFixture<AddBillComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AddBillComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AddBillComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
