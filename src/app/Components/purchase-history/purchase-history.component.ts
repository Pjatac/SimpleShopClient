import { Component, OnInit } from '@angular/core';
import ConnectService from 'src/app/Services/connect.service';
import { PurchaseItem } from 'src/app/models/purchaseItem';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {
  purchases: PurchaseItem[][];
  displayedColumns: string[] = ['name', 'qnt', 'price','cost'];
  constructor(private connectService: ConnectService) { }

  async ngOnInit() {
    this.connectService.subscribeToPurchasesUpdates()
    .subscribe((purchases: PurchaseItem[][]) => {
      this.purchases = purchases as PurchaseItem[][];
    });
    this.connectService.emitGetPurchases();
  }
}
