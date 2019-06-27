import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery/gallery.component';
import { SharedModule } from '../shared/shared.module';
import { GalleryViewComponent } from './gallery-view/gallery-view.component';

@NgModule({
  declarations: [GalleryComponent, GalleryViewComponent],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    SharedModule
  ],
  exports: [GalleryComponent]
})
export class GalleryModule { }
