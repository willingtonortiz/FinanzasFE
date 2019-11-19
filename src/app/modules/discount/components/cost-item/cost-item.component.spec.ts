import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CostItemComponent } from "./cost-item.component";

describe("CostItemComponent", () => {
	let component: CostItemComponent;
	let fixture: ComponentFixture<CostItemComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CostItemComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CostItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
