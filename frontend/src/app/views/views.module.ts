import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ConfigInfoComponent } from './config-info/config-info.component';
import { InitDescriptionComponent } from './init-description/init-description.component';
import { SelectionInfoComponent } from './selection-info/selection-info.component';

@NgModule({
	declarations: [
		ConfigInfoComponent,
		InitDescriptionComponent,
		SelectionInfoComponent
	],
	imports: [CommonModule],
	exports: []
})
export class ViewsModule {}
