import { NgModule } from '@angular/core';
import { UserstatusComponent } from './userstatus/userstatus';
import {CommonModule} from "@angular/common";
@NgModule({
	declarations: [UserstatusComponent],
	imports: [CommonModule],
	exports: [UserstatusComponent]
})
export class ComponentsModule {}
