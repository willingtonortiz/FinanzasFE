import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DiscountedBillGroupComponent } from "./discounted-bill-group.component";

describe("DiscountedBillGroupComponent", () => {
	let component: DiscountedBillGroupComponent;
	let fixture: ComponentFixture<DiscountedBillGroupComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DiscountedBillGroupComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DiscountedBillGroupComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
