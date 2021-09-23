import { Component, OnInit,Output, EventEmitter,Input} from '@angular/core';
import * as Globals from '../../global';

@Component({
  selector: 'item-per-page',
  templateUrl: './item-per-page.component.html',
  styleUrls: ['./item-per-page.component.scss']
})
export class ItemPerPageComponent implements OnInit {

  itemPerPageNumList:any = [];
  itemPerPage:number;
  @Output() countSelectionChanged: EventEmitter<number> =  new EventEmitter<number>();
  @Input() item:number;

  constructor() {
    this.itemPerPageNumList = Globals.itemPerPageNumList;
   }

  ngOnInit() {
    // console.log(this.item)
  }
  onSelectionChange() {
    this.countSelectionChanged.emit(this.item);
  }

}
