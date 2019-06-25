import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
} from '@angular/material';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery/gallery.component';
import { RobotComponent } from './robot/robot.component';
import { NewRobotFormComponent } from './new-robot-form/new-robot-form.component';

@NgModule({
  declarations: [GalleryComponent, RobotComponent, NewRobotFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GalleryRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class GalleryModule { }
