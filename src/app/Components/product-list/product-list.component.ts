import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input() products: Product[];
  @Output() callAddToCard = new EventEmitter<Product>();
  constructor() { }

  ngOnInit() { }
  addToCard(prod: Product){
    this.callAddToCard.emit(prod);
  }
}
