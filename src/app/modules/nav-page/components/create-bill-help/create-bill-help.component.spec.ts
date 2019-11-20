import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CreateBillHelpComponent } from "./create-bill-help.component";

describe("CreateBillHelpComponent", () => {
	let component: CreateBillHelpComponent;
	let fixture: ComponentFixture<CreateBillHelpComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CreateBillHelpComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CreateBillHelpComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
