import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'svg-path',
  templateUrl: './svg-path.component.html',
  styleUrls: ['./svg-path.component.scss']
})
export class SvgPathComponent implements OnInit {

  @Input() id: string;
  @Input() width: number;
  @Input() height: number;
  @Input() fill: string;
  constructor() { }

  ngOnInit(): void {
  }

}
