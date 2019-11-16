import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DiscountedBillInfoGroupComponent } from "./discounted-bill-info-group.component";

describe("DiscountedBillInfoGroupComponent", () => {
	let component: DiscountedBillInfoGroupComponent;
	let fixture: ComponentFixture<DiscountedBillInfoGroupComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DiscountedBillInfoGroupComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DiscountedBillInfoGroupComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
