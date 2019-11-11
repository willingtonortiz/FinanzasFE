import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DisplaySelectedRateComponent } from "./display-selected-rate.component";

describe("DisplaySelectedRateComponent", () => {
	let component: DisplaySelectedRateComponent;
	let fixture: ComponentFixture<DisplaySelectedRateComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DisplaySelectedRateComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DisplaySelectedRateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
