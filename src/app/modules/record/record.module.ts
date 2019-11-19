import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RecordRoutingModule } from "./record-routing.module";
import { RecordComponent } from "./pages";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { PipesModule } from "src/app/shared/pipes/pipes.module";
import { RecordDetailComponent } from './components/record-detail/record-detail.component';
;

@NgModule({
	imports: [CommonModule, RecordRoutingModule, ComponentsModule, PipesModule],
	declarations: [
		RecordComponent,
		RecordDetailComponent
	]
})
export class RecordModule {}
