import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
	declarations: [VideoPlayerComponent],
	imports: [CommonModule],
	exports: [VideoPlayerComponent]
})
export class SharedModule {}


