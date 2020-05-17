import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WhItemModel} from '../warehouse.model';

@Component({
  selector: 'app-wh-item',
  templateUrl: './wh-item.component.html',
  styleUrls: ['./wh-item.component.scss']
})
export class WhItemComponent implements OnInit {
  @Input() whItem: WhItemModel;
  @Output() openEdit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() itemId: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  openEditModal() {
    this.openEdit.emit(true);
    this.itemId.emit(this.whItem.id);
  }

}
