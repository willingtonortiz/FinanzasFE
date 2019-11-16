import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DiscountedBillInfoComponent } from "./discounted-bill-info.component";

describe("DiscountedBillInfoComponent", () => {
	let component: DiscountedBillInfoComponent;
	let fixture: ComponentFixture<DiscountedBillInfoComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DiscountedBillInfoComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DiscountedBillInfoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
