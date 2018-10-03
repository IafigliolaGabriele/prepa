import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-beatriz',
  templateUrl: './beatriz.component.html',
  styleUrls: ['./beatriz.component.css']
})
export class BeatrizComponent implements OnInit {
  @Input() name;
  constructor() { }

  ngOnInit() {
  }

}
