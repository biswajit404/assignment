import { Component, OnInit, Input, ElementRef, SimpleChange, SimpleChanges,ViewChild } from '@angular/core';

export enum LoadingState {
  NotReady,
  Processing,
  Ready
}

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  LoadingStateType = LoadingState;
  loading = LoadingState.NotReady;

  @Input('state') state: LoadingState;
  loadState: number;
  constructor(private element: ElementRef) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.state) {
      this.loadState = this.state
    }
  }

}
