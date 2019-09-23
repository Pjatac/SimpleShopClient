import { Component, OnInit, ViewChild } from '@angular/core';
import { PriceChangeItem } from 'src/app/Models/priceChangeItem';
import ConnectService from 'src/app/Services/connect.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-price-history',
  templateUrl: './price-history.component.html',
  styleUrls: ['./price-history.component.css']
})

export class PriceHistoryComponent implements OnInit {

  priceChanges: PriceChangeItem[];
  dataSource = new MatTableDataSource<PriceChangeItem>(this.priceChanges);
  displayedColumns: string[] = ['name', 'price', 'date-time'];
  public products: string[];
  public selected;
  public chartType: string = 'line';
  public chartDatasets = [];
  public chartLabels = [];  
  public chartOptions: any = {
    responsive: true
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private connectService: ConnectService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.connectService
      .subscribeToPriceChanges()
      .subscribe((priceChanges: PriceChangeItem[]) => {
        this.priceChanges = priceChanges;
        this.dataSource.data = this.priceChanges;
        this.products = this.connectService.findProducts(this.priceChanges);
      });
    this.connectService.emitGetPriceChanges();
  }
  
  buildChart(){
    this.chartDatasets = this.connectService.buildChartDataSet(this.priceChanges, this.selected);
    this.chartLabels = this.connectService.buildChartLabels(this.priceChanges, this.selected);
  }
}

