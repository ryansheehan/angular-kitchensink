import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IRobot, RobotTemplate } from '../robot/models/robot.model';

const idGen = (function*() {
  for (let id = 0;; ++id) {
    yield id;
  }
})();

@Injectable({
  providedIn: 'root'
})
export class RobotCollectionService {

  readonly robots = new BehaviorSubject<IRobot[]>([
    { name: 'Ryan', id: idGen.next().value },
    { name: 'Derek', id: idGen.next().value },
    { name: 'Sami', id: idGen.next().value },
    { name: 'Chris', id: idGen.next().value },
    { name: 'Mark', id: idGen.next().value },
    { name: 'Rick', id: idGen.next().value },
    { name: 'Ethan', id: idGen.next().value },
  ]);

  constructor() { }

  add(robotTemplate: RobotTemplate) {
    this.robots.next([
      {...robotTemplate, id: idGen.next().value},
      ...this.robots.value,
    ]);
  }

  remove(robot: IRobot | number) {
    const id = typeof robot === 'object' ? robot.id : robot;
    const index = this.robots.value.findIndex(r => r.id === id);
    this.robots.next([
      ...this.robots.value.slice(0, index),
      ...this.robots.value.slice(index + 1)
    ]);
  }
}
