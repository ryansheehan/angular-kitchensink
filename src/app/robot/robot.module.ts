import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatProgressBarModule,
} from '@angular/material';

import { MainViewComponent } from './main-view/main-view.component';
import { GalleryComponent } from './gallery/gallery.component';
import { RobotComponent } from './robot/robot.component';
import { NewRobotFormComponent } from './new-robot-form/new-robot-form.component';
import { RobotRoutingModule } from './robot-routing.module';

@NgModule({
  declarations: [MainViewComponent, GalleryComponent, RobotComponent, NewRobotFormComponent],
  imports: [
    CommonModule,
    RobotRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
  ]
})
export class RobotModule { }
