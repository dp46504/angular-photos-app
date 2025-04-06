import { Component } from '@angular/core';
import {
  trigger,
  transition,
  state,
  animate,
  style,
  AnimationEvent,
} from '@angular/animations';

@Component({
  selector: 'app-pulse',
  standalone: false,
  templateUrl: './pulse.component.html',
  styleUrl: './pulse.component.scss',
  animations: [
    trigger('pulse', [
      state(
        'up',
        style({
          opacity: 1,
        })
      ),
      state(
        'down',
        style({
          opacity: 0.5,
        })
      ),
      transition('up => down', [animate('0.5s 0 ease-in-out')]),
      transition('down => up', [animate('1s 0 ease-in-out')]),
    ]),
  ],
})
export class PulseComponent {}
