import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UsageButtonComponent } from './usage-button/usage-button.component';
import { UsagesRoutingModule } from './usages-routing.module';
import { UsagesComponent } from './usages.component';

@NgModule({
	declarations: [UsagesComponent, UsageButtonComponent],
	imports: [CommonModule, UsagesRoutingModule]
})
export class UsagesModule {}
