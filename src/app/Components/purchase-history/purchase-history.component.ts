import { Component, OnInit } from '@angular/core';
import ConnectService from 'src/app/Services/connect.service';
import { PurchaseItem } from 'src/app/models/purchaseItem';
import { ChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})

export class PurchaseHistoryComponent implements OnInit {
  
  purchases: PurchaseItem[][];
  displayedColumns: string[] = ['name', 'qnt', 'price','cost'];

  public chartType: string = 'line';
  public chartDatasets= [{data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'}];
  public chartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];  
  public chartOptions: any = {
    responsive: true
  };

  constructor(private connectService: ConnectService) { }

  async ngOnInit() {
    this.connectService.subscribeToPurchasesUpdates()
    .subscribe((purchases: PurchaseItem[][]) => {
      this.purchases = purchases as PurchaseItem[][];
    });
    this.connectService.emitGetPurchases();
  }
}
