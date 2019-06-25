import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RobotCollectionService } from '../robot-collection.service';
import { IRobot } from '../models/robot.model';

@Component({
  selector: 'tyl-new-robot-form',
  templateUrl: './new-robot-form.component.html',
  styleUrls: ['./new-robot-form.component.scss']
})
export class NewRobotFormComponent implements OnInit {

  newRobotForm: FormGroup;

  constructor(private fb: FormBuilder, private robotCollectionService: RobotCollectionService) { }

  ngOnInit() {
    this.newRobotForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  addRobot() {
    this.robotCollectionService.add(this.newRobotForm.value);
    this.newRobotForm.reset();
    this.newRobotForm.get('name').setErrors(null);
  }
}
