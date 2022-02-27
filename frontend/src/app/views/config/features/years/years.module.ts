import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { YearsRoutingModule } from './years-routing.module';
import { YearsComponent } from './years.component';

@NgModule({
	declarations: [YearsComponent],
	imports: [CommonModule, NgxSliderModule, YearsRoutingModule]
})
export class YearsModule {


	
}
