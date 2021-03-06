import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/product';
import { CardItem } from 'src/app/Models/cardItem';
import ConnectService from 'src/app/Services/connect.service';
import PurchaseCardService from 'src/app/services/purchaseCard.service';
import ProductService from 'src/app/services/product.service';
import { MatDialog } from '@angular/material';
import { MydialogComponent } from '../mydialog/mydialog.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {
  card: CardItem[];
  dataSource = new MatTableDataSource<CardItem>();
  products: Product[];

  constructor(private productService: ProductService, private connectService: ConnectService, private purchaseCardService: PurchaseCardService, public dialog: MatDialog) { }

  async ngOnInit() {
    this.card = new Array();
    this.dataSource.data = this.card;
    this.products = await this.productService.getProducts();
    await this.purchaseCardService.getPurchaseCardItems().then(res => { this.card = res; this.dataSource.data = this.card; });
    this.connectService.subscribeToProductsUpdates()
      .subscribe((products: Product[]) => {
        this.products = this.productService.recalculate(products);
        this.purchaseCardService.recalculate(products);
      });
    this.connectService.emitGetProducts();
  }

  async callAddToCard(cardItem: CardItem) {
    await this.purchaseCardService.addToCard(cardItem);
    await this.purchaseCardService.getPurchaseCardItems().then(res => { this.card = res; this.dataSource.data = this.card; });
  }

  async removeItem(cardItem) {
    await this.purchaseCardService.removeFromCard(cardItem);
    await this.purchaseCardService.getPurchaseCardItems().then(res => { this.card = res; this.dataSource.data = this.card; });
  }

  async incQnt(cardItem) {
    await this.purchaseCardService.incQnt(cardItem);
    await this.purchaseCardService.getPurchaseCardItems().then(res => { this.card = res; this.dataSource.data = this.card; });
  }

  async decQnt(cardItem) {
    await this.purchaseCardService.decQnt(cardItem);
    await this.purchaseCardService.getPurchaseCardItems().then(res => { this.card = res; this.dataSource.data = this.card; });
  }
  
  async buyCard() {
    const str = await this.purchaseCardService.purchase();
    this.dialog.open(MydialogComponent, { data: str });
    this.card = new Array();
    this.dataSource.data = this.card;
  }
}