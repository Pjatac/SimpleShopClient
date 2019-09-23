import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CardItem } from 'src/app/models/cardItem';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-purchase-card',
  templateUrl: './purchase-card.component.html',
  styleUrls: ['./purchase-card.component.css']
})

export class PurchaseCardComponent implements OnInit {
  @Input() card: CardItem[];
  @Input() dataSource: MatTableDataSource<CardItem>;
  @Output() removeItem = new EventEmitter();
  @Output() incQnt = new EventEmitter();
  @Output() decQnt = new EventEmitter();
  @Output() buyCard = new EventEmitter();
  displayedColumns: string[] = ['name', 'qnt', 'price', 'upqnt', 'downqnt', 'cost', 'remove'];

  constructor() { }

  ngOnInit() {
  }

  removeCardItem(cardItem: CardItem) {
    this.removeItem.emit(cardItem);
  }

  increaseQnt(cardItem: CardItem) {
    this.incQnt.emit(cardItem);
  }

  decreaseQnt(cardItem: CardItem) {
    this.decQnt.emit(cardItem);
  }

  total() {
    var summ = 0;
    for (let item of this.card) {
      summ += item.price * item.qnt;
    }
    return summ;
  }

  buy() {
    this.buyCard.emit();
  }
}
