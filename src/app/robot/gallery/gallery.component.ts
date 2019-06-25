import { Component, OnInit } from '@angular/core';
import { IRobot } from '../models/robot.model';
import { RobotCollectionService } from '../robot-collection.service';

@Component({
  selector: 'tyl-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  robots: IRobot[] = [];

  constructor(private robotCollectionService: RobotCollectionService) { }

  ngOnInit() {
    this.robotCollectionService.robots.subscribe(robots => this.robots = robots);
  }

  trackByRobot(index: number, item: IRobot) {
    return item.id;
  }

  removeRobot(robot: IRobot) {
    this.robotCollectionService.remove(robot);
  }
}
