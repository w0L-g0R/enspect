import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UsagesRoutingModule } from './usages-routing.module';
import { UsagesComponent } from './usages.component';

@NgModule({
	declarations: [UsagesComponent],
	imports: [CommonModule, UsagesRoutingModule]
})
export class UsagesModule {}
