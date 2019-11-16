import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DiscountedPoolItemComponent } from "./discounted-pool-item.component";

describe("DiscountedPoolItemComponent", () => {
	let component: DiscountedPoolItemComponent;
	let fixture: ComponentFixture<DiscountedPoolItemComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DiscountedPoolItemComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DiscountedPoolItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
