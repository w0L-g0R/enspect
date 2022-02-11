import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ConfigInfoComponent } from './config-info/config-info.component';
import { InitDescriptionComponent } from './init-description/init-description.component';

@NgModule({
	declarations: [ConfigInfoComponent, InitDescriptionComponent],
	imports: [CommonModule],
	exports: []
})
export class ViewsModule {}
