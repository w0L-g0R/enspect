import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { YearsRoutingModule } from './years-routing.module';
import { YearsComponent } from './years.component';

@NgModule({
	declarations: [YearsComponent],
	imports: [CommonModule, YearsRoutingModule]
})
export class YearsModule {}
