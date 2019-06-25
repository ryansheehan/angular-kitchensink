import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { IRobot } from '../../robot/models/robot.model';

@Component({
  selector: 'tyl-robot',
  templateUrl: './robot.component.html',
  styleUrls: ['./robot.component.scss']
})
export class RobotComponent implements OnInit, AfterViewInit {
  @ViewChild('robotImage', {static: false}) robotImageRef: ElementRef;

  @Input() robot: IRobot;
  @Output() delete = new EventEmitter<IRobot>();
  imgSrc: string;
  loading = true;

  constructor() { }

  ngOnInit() {
    this.imgSrc = `https://robohash.org/${this.robot.name}.png?size=200x200;bgset=bg1`;
  }

  ngAfterViewInit() {
    fromEvent(this.robotImageRef.nativeElement, 'load').subscribe(() => {
      this.loading = false;
    });
  }

  onDelete() {
    this.delete.emit(this.robot);
  }
}
